package politiet.no.personkontroll.data.models;

/**
 * Created by hanne.roos on 29.12.2016.
 * Immutable model class for a Bruker.
 */
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.google.common.base.Objects;
import com.google.common.base.Strings;

import java.util.UUID;

public class Bruker {
    @NonNull
    private final String mId;

    @Nullable
    private final String mNavn;

    @Nullable
    private final String mBeskrivelse;


    /**
     * Use this constructor to create a new completed Bruker.
     *
     * @param navn       name of the user
     * @param beskrivelse description of the user
     */
    public Bruker(@Nullable String navn, @Nullable String beskrivelse) {
        this(navn, beskrivelse, UUID.randomUUID().toString());
    }

    /**
     * Use this constructor to specify a completed Bruker if the Bruker already has an id (copy of
     * another Bruker).
     *
     * @param navn       name of the user
     * @param beskrivelse description of the user
     * @param id          id of the user
     */
    public Bruker(@Nullable String navn, @Nullable String beskrivelse, @NonNull String id) {
        mId = id;
        mNavn = navn;
        mBeskrivelse = beskrivelse;
    }

    @NonNull
    public String getId() {
        return mId;
    }

    @Nullable
    public String getNavn() {
        return mNavn;
    }

    @Nullable
    public String getNavnForList() {
        if (!Strings.isNullOrEmpty(mNavn)) {
            return mNavn;
        } else {
            return mBeskrivelse;
        }
    }

    @Nullable
    public String getDescription() {
        return mBeskrivelse;
    }

    public boolean isEmpty() {
        return Strings.isNullOrEmpty(mNavn) &&
                Strings.isNullOrEmpty(mBeskrivelse);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bruker task = (Bruker) o;
        return Objects.equal(mId, task.mId) &&
                Objects.equal(mNavn, task.mNavn) &&
                Objects.equal(mBeskrivelse, task.mBeskrivelse);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(mId, mNavn, mBeskrivelse);
    }

    @Override
    public String toString() {
        return "User with name " + mNavn;
    }
}
