package politiet.no.personkontroll.controllers;

import android.content.Context;

import politiet.no.personkontroll.states.State;
import trikita.jedux.Action;
import trikita.jedux.Store;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public class PersistanceController implements Store.Middleware<Action, State> {

 //   private final SharedPreferences mPreferences;
//    private final Gson mGson;

    public PersistanceController(Context context) {
//        mPreferences = context.getSharedPreferences("data", 0);
//        GsonBuilder gsonBuilder = new GsonBuilder();
//        gsonBuilder.registerTypeAdapterFactory(new GsonAdaptersState());
//        mGson = gsonBuilder.create();
    }

    public State getSavedState() { // TODO implementer hent fra webapi
//        if (mPreferences.contains("data")) {
//            String json = mPreferences.getString("data", "");
//            return mGson.fromJson(json, ImmutableState.class);
//        }
        return null;
    }

    @Override
    public void dispatch(Store<Action, State> store, Action action, Store.NextDispatcher<Action> next) {
        next.dispatch(action);
      //  String json = mGson.toJson(store.getState());
      //  mPreferences.edit().putString("data", json).apply();
    }
}
