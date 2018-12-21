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

package politiet.no.personkontroll.data.source.kontroll;

import android.support.annotation.NonNull;

import javax.inject.Inject;
import javax.inject.Singleton;

import politiet.no.personkontroll.data.source.KontrollRepositoryModule;
import politiet.no.personkontroll.data.source.Remote;
import politiet.no.personkontroll.data.models.Kontroll;

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
 * emits a compiler error). It uses {@link KontrollRepositoryModule} to do so, and the constructed
 * instance is available in {@link KontrollRepositoryComponent}.
 * <p />
 * Dagger generated code doesn't require public access to the constructor or class, and
 * therefore, to ensure the developer doesn't instantiate the class manually and bypasses Dagger,
 * it's good practice minimise the visibility of the class/constructor as much as possible.
 */
@Singleton
public class KontrollRepository implements KontrollDataSource {

    private final KontrollDataSource mRemoteDataSource;

    /**
     * This variable has package local visibility so it can be accessed from tests.
     */
    Kontroll mCached;

    /**
     * Marks the cache as invalid, to force an update the next time data is requested. This variable
     * has package local visibility so it can be accessed from tests.
     */
    boolean mCacheIsDirty = false;

    /**
     * By marking the constructor with {@code @Inject}, Dagger will try to inject the dependencies
     * required to create an instance of the BrukerRepository. Because {@link KontrollDataSource} is an
     * interface, we must provide to Dagger a way to build those arguments, this is done in
     * {@link KontrollRepositoryModule}.
     * <P>
     * When two arguments or more have the same type, we must provide to Dagger a way to
     * differentiate them. This is done using a qualifier.
     * <p>
     * Dagger strictly enforces that arguments not marked with {@code @Nullable} are not injected
     * with {@code @Nullable} values.
     */
    @Inject
    KontrollRepository(@Remote KontrollDataSource remoteDataSource) {
        mRemoteDataSource = remoteDataSource;
    }

    /**
     * Gets Bruker from cache or remote data source, whichever is
     * available first.
     * <p>
     * Note: {@link politiet.no.personkontroll.data.source.kontroll.KontrollDataSource.GetKontrollCallback#onDataNotAvailable()} is fired if all data sources fail to
     * get the data.
     */
    @Override
    public void getKontroll(@NonNull final GetKontrollCallback callback) {
        checkNotNull(callback);

        // Respond immediately with cache if available and not dirty
        if (mCached != null && !mCacheIsDirty) {
            callback.onKontrollLoaded(mCached);
            return;
        }

        if (mCacheIsDirty || null == mCached) {
            // If the cache is dirty we need to fetch new data from the network.
            getKontrollFromRemoteDataSource(callback);
        } else {
            callback.onKontrollLoaded(mCached);
        }
    }

    /**
     * Gets Kontroll from the network data source.
     * <p>
     * Note: {@link GetKontrollCallback#onDataNotAvailable()} is fired if both data sources fail to
     * get the data.
     */
    @Override
    public void getKontroll(@NonNull final String id, @NonNull final GetKontrollCallback callback) {
        checkNotNull(id);
        checkNotNull(callback);


        // Respond immediately with cache if available
        if (mCached != null && mCached.getId().equalsIgnoreCase(id)) {
            callback.onKontrollLoaded(mCached);
            return;
        }

        // Load from server/persisted if needed.
                mRemoteDataSource.getKontroll(id, new GetKontrollCallback() {
                    @Override
                    public void onKontrollLoaded(Kontroll kontroll) {
                        callback.onKontrollLoaded(kontroll);
                    }

                    @Override
                    public void onDataNotAvailable() {
                        callback.onDataNotAvailable();
                    }
                });
    }

    @Override
    public void refreshKontroll() {
        mCacheIsDirty = true;
    }


    private void getKontrollFromRemoteDataSource(@NonNull final GetKontrollCallback callback) {
        mRemoteDataSource.getKontroll(new GetKontrollCallback() {
            @Override
            public void onKontrollLoaded(Kontroll kontroll) {
                refreshCache(kontroll);
                callback.onKontrollLoaded(mCached);
            }

            @Override
            public void onDataNotAvailable() {
                callback.onDataNotAvailable();
            }
        });
    }

    private void refreshCache(Kontroll kontroll) {
        mCached = kontroll;
        mCacheIsDirty = false;
    }


}
