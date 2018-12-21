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

package politiet.no.personkontroll.mvp.forside;

import android.support.annotation.NonNull;

import com.google.common.base.Strings;

import javax.inject.Inject;

import politiet.no.personkontroll.data.source.kontroll.KontrollDataSource;
import politiet.no.personkontroll.data.source.kontroll.KontrollRepository;
import politiet.no.personkontroll.data.models.Kontroll;

/**
 * Listens to user actions from the UI ({@link ForsideFragment}), retrieves the data and updates
 * the UI as required.
 * <p>
 * By marking the constructor with {@code @Inject}, Dagger injects the dependencies required to
 * create an instance of the TaskDetailPresenter (if it fails, it emits a compiler error). It uses
 * {@link ForsidePresenterModule} to do so.
 * <p>
 * Dagger generated code doesn't require public access to the constructor or class, and
 * therefore, to ensure the developer doesn't instantiate the class manually and bypasses Dagger,
 * it's good practice minimise the visibility of the class/constructor as much as possible.
 */
final class ForsidePresenter implements ForsideContract.Presenter {

    private KontrollRepository mRepository;

    private ForsideContract.View mView;

    @Inject
    ForsidePresenter(
            KontrollRepository repository,
            ForsideContract.View view) {
        mRepository = repository;
        mView = view;
    }

    /**
     * Method injection is used here to safely reference {@code this} after the object is created.
     * For more information, see Java Concurrency in Practice.
     */
    @Inject
    void setupListeners() {
        mView.setPresenter(this);
    }

    @Override
    public void start() {
        init();
    }

    private void init() {

        mView.setLoadingIndicator(true);
        mRepository.getKontroll(new KontrollDataSource.GetKontrollCallback() {
            @Override
            public void onKontrollLoaded(Kontroll kontroll) {
                // The view may not be able to handle UI updates anymore
                if (!mView.isActive()) {
                    return;
                }
                mView.setLoadingIndicator(false);
                if (null == kontroll) {
                    mView.hideKontrolltype();
                } else {
                    showKontrollType(kontroll);
                }
            }

            @Override
            public void onDataNotAvailable() {
                // The view may not be able to handle UI updates anymore
                if (!mView.isActive()) {
                    return;
                }
                mView.hideKontrolltype();
            }
        });
    }


    private void showKontrollType(@NonNull Kontroll kontroll) {
        String type = kontroll.getKontrollType();
        String description = kontroll.getBeskrivelse();

        if (Strings.isNullOrEmpty(type)) {
            mView.hideKontrolltype();
        } else {
            mView.showKontrolltype(type);
        }
    }

    @Override
    public void dokument() {
        mView.showDialog("Dokument");

    }

    @Override
    public void sok() {
        mView.showDialog("Søk");

    }

    @Override
    public void nummerskilt() {
        mView.showDialog("Nummerskilt");

    }

    @Override
    public void personfoto() {

        mView.showDialog("Personfoto");
    }

    @Override
    public void fingeravtrykk() {
        mView.showDialog("Fingeravtrykk");

    }

    @Override
    public void historikk() {

        mView.showDialog("Historikk");
    }

    @Override
    public void kontrolltype() {
        mView.showDialog("Kontrolltype");

    }
}
