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

import android.os.Handler;
import android.support.annotation.NonNull;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

import javax.inject.Singleton;

import politiet.no.personkontroll.data.models.Kontroll;

/**
 * Implementation of the data source that adds a latency simulating network.
 */
@Singleton
public class KontrollRemoteDataSource implements KontrollDataSource {

    private static final int SERVICE_LATENCY_IN_MILLIS = 5000;

    private final static Map<String, Kontroll> SERVICE_DATA;

    static {
        SERVICE_DATA = new LinkedHashMap<>(2);
        addKontroll("Pass", "Ny passkontroll.");
    }

    public KontrollRemoteDataSource() {}
    private static void addKontroll(String name, String description) {
        Kontroll newBruker = new Kontroll(name, description);
        SERVICE_DATA.put(newBruker.getId(), newBruker);
    }
    /**
     * Note: {@link politiet.no.personkontroll.data.source.kontroll.KontrollDataSource.GetKontrollCallback#onDataNotAvailable()} is never fired. In a real remote data
     * source implementation, this would be fired if the server can't be contacted or the server
     * returns an error.
     */
    @Override
    public void getKontroll(@NonNull final GetKontrollCallback callback) {
        // Simulate network by delaying the execution.
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Set<String> keys = SERVICE_DATA.keySet();
                String first = keys.iterator().next().toString();
                callback.onKontrollLoaded(SERVICE_DATA.get(first));
            }
        }, SERVICE_LATENCY_IN_MILLIS);
    }


    /**
     * Note: {@link GetKontrollCallback#onDataNotAvailable()} is never fired. In a real remote data
     * source implementation, this would be fired if the server can't be contacted or the server
     * returns an error.
     */
    @Override
    public void getKontroll(@NonNull String id, final @NonNull GetKontrollCallback callback) {
        final Kontroll kontroll = SERVICE_DATA.get(id);

        // Simulate network by delaying the execution.
        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                callback.onKontrollLoaded(kontroll);
            }
        }, SERVICE_LATENCY_IN_MILLIS);
    }

    @Override
    public void refreshKontroll() {
        // Not required because the {@link BrukerRepository} handles the logic of refreshing the
        // Bruker from all the available data sources.
    }
}
