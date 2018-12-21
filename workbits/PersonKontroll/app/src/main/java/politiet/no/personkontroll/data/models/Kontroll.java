package politiet.no.personkontroll.data.models;

/**
 * Created by hanne.roos on 29.12.2016.
 */
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.google.common.base.Objects;
import com.google.common.base.Strings;

import java.util.UUID;

/**
 * Immutable object for storing a person control situation
 */
public class Kontroll {

    @NonNull
    private final String mId;

    @Nullable
    private final String mKontrollType;

    @Nullable
    private final String mBeskrivelse;

    /**
     * @param kontrollType
     * @param beskrivelse
     */
    public Kontroll(String kontrollType, String beskrivelse) {
        this(kontrollType, beskrivelse, UUID.randomUUID().toString());
    }

    /**
     * @param mKontrollType
     * @param mBeskrivelse
     * @param mId
     */
    public Kontroll(String mKontrollType, String mBeskrivelse, @NonNull String mId) {
        this.mId = mId;
        this.mKontrollType = mKontrollType;
        this.mBeskrivelse = mBeskrivelse;
    }

    @NonNull
    public String getId() {
        return mId;
    }

    @Nullable
    public String getKontrollType() {
        return mKontrollType;
    }

    @Nullable
    public String getBeskrivelse() {
        return mBeskrivelse;
    }
}
