/*
 * Copyright (C) 2015 The Android Open Source Project
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

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import politiet.no.personkontroll.R;
import politiet.no.personkontroll.mvp.util.AlertDialogFragment;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Main UI for the task detail screen.
 */
public class ForsideFragment extends Fragment implements ForsideContract.View {

    private ForsideContract.Presenter mPresenter;

    private Button mKontrolltype;
    private Button mDokument;
    private Button mFingeravtrykk;
    private Button mNummerskilt;
    private Button mSok;
    private Button mPersonfoto;
    private Button mHistorikk;

    public static ForsideFragment newInstance() {
       // Bundle arguments = new Bundle();
     //   arguments.putString(ARGUMENT_TASK_ID, taskId);
        ForsideFragment fragment = new ForsideFragment();
    //    fragment.setArguments(arguments);
        return fragment;
    }

    @Override
    public void onResume() {
        super.onResume();
        mPresenter.start();
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,Bundle savedInstanceState) {
        // Set up action buttons
        View root = inflater.inflate(R.layout.forside_frag, container, false);
        mKontrolltype = (Button) root.findViewById(R.id.kontrolltype);
        mDokument = (Button) root.findViewById(R.id.dokument);
        mPersonfoto = (Button) root.findViewById(R.id.personfoto);
        mFingeravtrykk = (Button) root.findViewById(R.id.fingeravtrykk);
        mNummerskilt = (Button) root.findViewById(R.id.nummerskilt);
        mSok = (Button) root.findViewById(R.id.sok);
        mHistorikk = (Button) root.findViewById(R.id.historikk);

        mKontrolltype.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPresenter.kontrolltype();
            }
        });
        mDokument.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPresenter.dokument();
            }
        });
        mPersonfoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPresenter.personfoto();
            }
        });
        mFingeravtrykk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPresenter.fingeravtrykk();
            }
        });
        mNummerskilt.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPresenter.nummerskilt();
            }
        });
        mSok.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPresenter.sok();
            }
        });
        mHistorikk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPresenter.historikk();
            }
        });
        return root;
    }
    @Override
    public void setPresenter(@NonNull ForsideContract.Presenter presenter) {
        mPresenter = checkNotNull(presenter);
    }
    @Override
    public void setLoadingIndicator(boolean active) {
        if (active) {
            mKontrolltype.setText(getString(R.string.loading));
        }
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
//        if (requestCode == REQUEST_EDIT_TASK) {
//            // If the task was edited successfully, go back to the list.
//            if (resultCode == Activity.RESULT_OK) {
//                getActivity().finish();
//            }
//        }
    }
    @Override
    public void hideKontrolltype() {
        mKontrolltype.setVisibility(View.GONE);
    }
    @Override
    public void showKontrolltype(@NonNull String kontrolltype) {
        mKontrolltype.setVisibility(View.VISIBLE);
        mKontrolltype.setText("Kontrolltype: " +kontrolltype);
    }

    @Override
    public boolean isActive() {
        return isAdded();
    }

    @Override
    public void showDialog(String message) {
        AlertDialogFragment alert = new AlertDialogFragment();
        alert.setValues(message,"PersonKontroll");
        alert.show(getFragmentManager(),"Tag1");
    }

}
