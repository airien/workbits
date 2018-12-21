package politiet.no.personkontroll.mvp.header;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import politiet.no.personkontroll.R;
import politiet.no.personkontroll.data.models.Bruker;
import politiet.no.personkontroll.mvp.util.AlertDialogFragment;

import static com.google.common.base.Preconditions.checkNotNull;

/**
 * Created by hanne.roos on 29.12.2016.
 */


    public class HeaderFragment extends Fragment implements HeaderContract.View {

    HeaderContract.Presenter mPresenter;
    private TextView mTitle;
    private String mTitleText;

    public static HeaderFragment newInstance(String title) {
        // Bundle arguments = new Bundle();
        //   arguments.putString(ARGUMENT_TASK_ID, taskId);
        HeaderFragment fragment = new HeaderFragment();
        fragment.setTitle(title);
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
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Set up action buttons
        View root = inflater.inflate(R.layout.header_frag, container, false);
        mTitle = (TextView) root.findViewById(R.id.header_title);
        mTitle.setText(mTitleText);
        return root;
    }
    @Override
    public void setPresenter(@NonNull HeaderContract.Presenter presenter) {
        mPresenter = checkNotNull(presenter);
    }
    @Override
    public void setLoadingIndicator(boolean active) {
        if (active) {
            mTitle.setText(getString(R.string.loading));
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
    public boolean isActive() {
        return isAdded();
    }

    @Override
    public void showDialog(String message) {
        AlertDialogFragment alert = new AlertDialogFragment();
        alert.setValues(message,"PersonKontroll");
        alert.show(getFragmentManager(),"Tag1");
    }

    @Override
    public void setTitle(String title) {
        mTitleText = title;
        if(null != mTitle)
            mTitle.setText(mTitleText);
    }

    @Override
    public void hideBruker() {

    }

    @Override
    public void showBruker(Bruker first) {

    }
}

