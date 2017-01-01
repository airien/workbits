package politiet.no.personkontroll.controllers;

import android.content.Context;
import android.content.Intent;

import politiet.no.personkontroll.Actions;
import politiet.no.personkontroll.activities.MainActivity;
import politiet.no.personkontroll.activities.SubActivity;
import politiet.no.personkontroll.states.State;
import trikita.jedux.Action;
import trikita.jedux.Store;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class SideController implements Store.Middleware<Action, State>  {

    private Context mContext;
    public SideController(Context c) {
        mContext = c;
    }


    @Override
    public void dispatch(Store<Action, State> store, Action action, Store.NextDispatcher<Action> nextDispatcher) {
        if (action.type instanceof Actions.Side) {
            Actions.Side nyside = (Actions.Side) action.type;
            Intent intent;
            switch (nyside)
            {
                case FORSIDE:
                    intent = new Intent(mContext, MainActivity.class);
                    break;
                default:
                    intent = new Intent(mContext,SubActivity.class);
                    break;
            }

            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            mContext.startActivity(intent);
        }

        nextDispatcher.dispatch(action);
    }
}
