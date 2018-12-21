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

package politiet.no.personkontroll.data;

import android.support.annotation.NonNull;

import com.google.common.collect.Lists;

import java.util.LinkedHashMap;
import java.util.Map;

import politiet.no.personkontroll.data.models.Bruker;
import politiet.no.personkontroll.data.source.bruker.BrukerDataSource;

/**
 * Implementation of a remote data source with static access to the data for easy testing.
 */
public class FakeBrukerRemoteDataSource implements BrukerDataSource {

    private static final Map<String, Bruker> BRUKER_SERVICE_DATA = new LinkedHashMap<>();

    public FakeBrukerRemoteDataSource() {
        Bruker bruker = new Bruker("TestBruker","Bruker for å¨teste");
        BRUKER_SERVICE_DATA.put(bruker.getId(),bruker);
    }

    @Override
    public void getBruker(@NonNull LoadBrukerCallback callback) {
        callback.onBrukerLoaded(Lists.newArrayList(BRUKER_SERVICE_DATA.values()));
    }

    @Override
    public void getBruker(@NonNull String brukerId, @NonNull GetBrukerCallback callback) {
        Bruker task = BRUKER_SERVICE_DATA.get(brukerId);
        callback.onBrukerLoaded(task);
    }

    @Override
    public void refreshBruker() {
        // does nothing
    }


}
