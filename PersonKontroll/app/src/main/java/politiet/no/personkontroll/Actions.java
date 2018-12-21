package politiet.no.personkontroll;

/**
 * Created by hanne.roos on 31.12.2016.
 */

public final class Actions {
    public enum Side {DOKUMENT, PERSONFOTO, FIGERAVTRYKK, NUMMERSKILT, SOK, FORSIDE, LESCHIP, HISTORIKK}
    public enum Person {HENT}
    public enum Dokument {MRZLEST, HENT, CLEARDOCUMENT, CHIPSTATUSUPDATE, CHIPLEST,UPDATECOM, UPDATESOD, UPDATEDG2, UPDATEDG1};
    public enum Varsel {HENT}
    public enum Bruker{HENT}
}
