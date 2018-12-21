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

import android.os.Handler;
import android.support.annotation.NonNull;

import com.google.common.collect.Lists;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.inject.Singleton;

import politiet.no.personkontroll.data.models.Bruker;

/**
 * Implementation of the data source that adds a latency simulating network.
 */
@Singleton
public class BrukerRemoteDataSource implements BrukerDataSource {

    private static final int SERVICE_LATENCY_IN_MILLIS = 5000;

    private final static Map<String, Bruker> BRUKER_SERVICE_DATA;

    static {
        BRUKER_SERVICE_DATA = new LinkedHashMap<>(2);
        addBruker("TestBruker", "Ground looks good, no foundation work required.");
    }

    public BrukerRemoteDataSource() {}
    private static void addBruker(String name, String description) {
        Bruker newBruker = new Bruker(name, description);
        BRUKER_SERVICE_DATA.put(newBruker.getId(), newBruker);
    }
    /**
     * Note: {@link LoadBrukerCallback#onDataNotAvailable()} is never fired. In a real remote data
     * source implementation, this would be fired if the server can't be contacted or the server
     * returns an error.
     */
    @Override
    public void getBruker(final @NonNull BrukerDataSource.LoadBrukerCallback callback) {
        // Simulate network by delaying the execution.
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                callback.onBrukerLoaded(Lists.newArrayList(BRUKER_SERVICE_DATA.values()));
            }
        }, SERVICE_LATENCY_IN_MILLIS);
    }


    /**
     * Note: {@link GetBrukerCallback#onDataNotAvailable()} is never fired. In a real remote data
     * source implementation, this would be fired if the server can't be contacted or the server
     * returns an error.
     */
    @Override
    public void getBruker(@NonNull String id, final @NonNull GetBrukerCallback callback) {
        final Bruker bruker = BRUKER_SERVICE_DATA.get(id);

        // Simulate network by delaying the execution.
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                callback.onBrukerLoaded(bruker);
            }
        }, SERVICE_LATENCY_IN_MILLIS);
    }

    @Override
    public void refreshBruker() {
        // Not required because the {@link BrukerRepository} handles the logic of refreshing the
        // Bruker from all the available data sources.
    }
}
