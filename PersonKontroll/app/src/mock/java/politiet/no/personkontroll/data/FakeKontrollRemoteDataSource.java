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
import java.util.List;
import java.util.Map;

import politiet.no.personkontroll.data.source.bruker.BrukerDataSource;
import politiet.no.personkontroll.data.source.kontroll.KontrollDataSource;
import politiet.no.personkontroll.daggerhelpers.forside.domain.model.Kontroll;
import politiet.no.personkontroll.daggerhelpers.header.domain.model.Bruker;

/**
 * Implementation of a remote data source with static access to the data for easy testing.
 */
public class FakeKontrollRemoteDataSource implements KontrollDataSource {

    private static final Map<String, Kontroll> SERVICE_DATA = new LinkedHashMap<>();

    public FakeKontrollRemoteDataSource() {
        Kontroll kontroll = new Kontroll("Pass","Testertestertester");
        SERVICE_DATA.put(kontroll.getId(),kontroll);
    }

    @Override
    public void getKontroll(@NonNull GetKontrollCallback callback) {
        List<Kontroll> liste = Lists.newArrayList(SERVICE_DATA.values());
        callback.onKontrollLoaded(liste.get(0));
    }

    @Override
    public void getKontroll(@NonNull String id, @NonNull GetKontrollCallback callback) {
        Kontroll task = SERVICE_DATA.get(id);
        callback.onKontrollLoaded(task);
    }

    @Override
    public void refreshKontroll() {
        // does nothing
    }


}
