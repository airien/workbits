package politiet.no.personkontroll.redux.controllers;

import android.content.Context;
import android.content.Intent;

import politiet.no.personkontroll.redux.Actions;
import politiet.no.personkontroll.redux.activities.MainActivity;
import politiet.no.personkontroll.redux.activities.SubActivity;
import politiet.no.personkontroll.redux.states.State;
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
            switch (nyside)
            {
                case FORSIDE:
                    mContext.startActivity(new Intent(mContext, MainActivity.class));
                    break;
                default:
                    mContext.startActivity(new Intent(mContext, SubActivity.class));
                    break;
            }
        }

        nextDispatcher.dispatch(action);
    }
}
