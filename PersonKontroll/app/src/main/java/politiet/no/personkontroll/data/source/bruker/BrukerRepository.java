/*
 * Copyright 2016, The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package politiet.no.personkontroll.data.source.bruker;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Singleton;

import politiet.no.personkontroll.data.source.BrukerRepositoryModule;
import politiet.no.personkontroll.data.source.Remote;
import politiet.no.personkontroll.data.models.Bruker;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Concrete implementation to load Bruker from the data sources into a cache.
 * <p>
 * For simplicity, this implements a dumb synchronisation between locally persisted data and data
 * obtained from the server, by using the remote data source only if the local database doesn't
 * exist or is empty.
 * <p />
 * By marking the constructor with {@code @Inject} and the class with {@code @Singleton}, Dagger
 * injects the dependencies required to create an instance of the BrukerRespository (if it fails, it
 * emits a compiler error). It uses {@link BrukerRepositoryModule} to do so, and the constructed
 * instance is available in {@link BrukerRepositoryComponent}.
 * <p />
 * Dagger generated code doesn't require public access to the constructor or class, and
 * therefore, to ensure the developer doesn't instantiate the class manually and bypasses Dagger,
 * it's good practice minimise the visibility of the class/constructor as much as possible.
 */
@Singleton
public class BrukerRepository implements BrukerDataSource {

    private final BrukerDataSource mBrukerRemoteDataSource;

    /**
     * This variable has package local visibility so it can be accessed from tests.
     */
    Map<String, Bruker> mCachedBrukere;

    /**
     * Marks the cache as invalid, to force an update the next time data is requested. This variable
     * has package local visibility so it can be accessed from tests.
     */
    boolean mCacheIsDirty = false;

    /**
     * By marking the constructor with {@code @Inject}, Dagger will try to inject the dependencies
     * required to create an instance of the BrukerRepository. Because {@link BrukerDataSource} is an
     * interface, we must provide to Dagger a way to build those arguments, this is done in
     * {@link BrukerRepositoryModule}.
     * <P>
     * When two arguments or more have the same type, we must provide to Dagger a way to
     * differentiate them. This is done using a qualifier.
     * <p>
     * Dagger strictly enforces that arguments not marked with {@code @Nullable} are not injected
     * with {@code @Nullable} values.
     */
    @Inject
    BrukerRepository(@Remote BrukerDataSource BrukerRemoteDataSource) {
        mBrukerRemoteDataSource = BrukerRemoteDataSource;
    }

    /**
     * Gets Bruker from cache, local data source (SQLite) or remote data source, whichever is
     * available first.
     * <p>
     * Note: {@link LoadBrukerCallback#onDataNotAvailable()} is fired if all data sources fail to
     * get the data.
     */
    @Override
    public void getBruker(@NonNull final LoadBrukerCallback callback) {
        checkNotNull(callback);

        // Respond immediately with cache if available and not dirty
        if (mCachedBrukere != null && !mCacheIsDirty) {
            callback.onBrukerLoaded(new ArrayList<>(mCachedBrukere.values()));
            return;
        }

        if (mCacheIsDirty) {
            // If the cache is dirty we need to fetch new data from the network.
            getBrukereFromRemoteDataSource(callback);
        } else {
            callback.onBrukerLoaded(mCachedBrukere.values());
        }
    }



    /**
     * Gets Bruker from local data source (sqlite) unless the table is new or empty. In that case it
     * uses the network data source. This is done to simplify the sample.
     * <p>
     * Note: {@link LoadBrukerCallback#onDataNotAvailable()} is fired if both data sources fail to
     * get the data.
     */
    @Override
    public void getBruker(@NonNull final String brukerId, @NonNull final GetBrukerCallback callback) {
        checkNotNull(brukerId);
        checkNotNull(callback);

        Bruker cached = getBrukerWithId(brukerId);

        // Respond immediately with cache if available
        if (cached != null) {
            callback.onBrukerLoaded(cached);
            return;
        }

        // Load from server/persisted if needed.
                mBrukerRemoteDataSource.getBruker(brukerId, new GetBrukerCallback() {
                    @Override
                    public void onBrukerLoaded(Bruker task) {
                        callback.onBrukerLoaded(task);
                    }

                    @Override
                    public void onDataNotAvailable() {
                        callback.onDataNotAvailable();
                    }
                });
    }

    @Override
    public void refreshBruker() {
        mCacheIsDirty = true;
    }


    private void getBrukereFromRemoteDataSource(@NonNull final LoadBrukerCallback callback) {
        mBrukerRemoteDataSource.getBruker(new LoadBrukerCallback() {
            @Override
            public void onBrukerLoaded(Collection<Bruker> Bruker) {
                refreshCache(Bruker);
                callback.onBrukerLoaded(mCachedBrukere.values());
            }

            @Override
            public void onDataNotAvailable() {
                callback.onDataNotAvailable();
            }
        });
    }

    private void refreshCache(Collection<Bruker> Bruker) {
        if (mCachedBrukere == null) {
            mCachedBrukere = new LinkedHashMap<>();
        }
        mCachedBrukere.clear();
        for (Bruker task : Bruker) {
            mCachedBrukere.put(task.getId(), task);
        }
        mCacheIsDirty = false;
    }

    @Nullable
    private Bruker getBrukerWithId(@NonNull String id) {
        checkNotNull(id);
        if (mCachedBrukere == null || mCachedBrukere.isEmpty()) {
            return null;
        } else {
            return mCachedBrukere.get(id);
        }
    }
}
