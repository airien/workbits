package politiet.no.personkontroll.states;

import com.google.gson.Gson;
import com.microblink.recognizers.BaseRecognitionResult;
import com.microblink.recognizers.blinkid.mrtd.MRTDRecognitionResult;
import com.microblink.results.ocr.OcrResult;

import org.immutables.value.Value;
import org.jmrtd.lds.DG1File;
import org.jmrtd.lds.MRZInfo;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import politiet.no.personkontroll.Actions;
import trikita.jedux.Action;

import static politiet.no.personkontroll.states.ImmutableDokument.builder;

/**
 * Created by hanne.roos on 31.12.2016.
 */

@Value.Immutable
public abstract class Dokument {

    public abstract String readStatus();
    public abstract boolean chiplest();
    public abstract DocSourceType docSourceType();
    public abstract String issuer();
    public abstract String documentCode();
    public abstract String opt1();
    public abstract String raw();
    public abstract String opt2();
    public abstract Date dateOfBirth();
    public abstract String documentNumber();
    public abstract String resultType();
    public abstract String sex();
    public abstract Date dateOfExpiry();
    public abstract String nationality();
    public abstract String secondaryId();
    public abstract String primaryId();
    public abstract byte[] personImageByteArray();


    enum DocSourceType
    {
        OpticalMRZ,
        ChipBAC,
        ChipPACE,
        OpticalMRZRaw
    }

    public Dokument() {}
    public static Dokument reduceDokument(Action action, Dokument dokument) {
        if (action.type instanceof Actions.Dokument) {
            Actions.Dokument type = (Actions.Dokument) action.type;
            switch (type) {
                case HENT: // få id på dokument fra action.value. Hent dokument fra repo hvis det eksisterer. Hvis ikke, lag nytt dokument.
                    return ImmutableDokument.copyOf(dokument);
                case MRZLEST:
                    BaseRecognitionResult[] resultArray = (BaseRecognitionResult[])action.value;
                    if(resultArray.length == 0 || resultArray[0] == null)
                        return ImmutableDokument.copyOf(dokument);
                    BaseRecognitionResult baseResult = resultArray[0];
                    if(baseResult instanceof MRTDRecognitionResult) {
                        MRTDRecognitionResult result = (MRTDRecognitionResult) baseResult;
                        // you can use getters of MRTDRecognitionResult class to
                        // obtain scanned information
                        if(result.isValid() && !result.isEmpty()) {
                            if(result.isMRZParsed()) {
                                return ImmutableDokument.copyOf(dokument)
                                        .withDocSourceType(DocSourceType.OpticalMRZ)
                                        .withRaw(result.getOcrResult().toString())
                                        .withPrimaryId(result.getPrimaryId())
                                        .withSecondaryId(result.getSecondaryId())
                                        .withDocumentNumber(result.getDocumentNumber())
                                        .withDateOfBirth(result.getDateOfBirth())
                                        .withDateOfExpiry(result.getDateOfExpiry());
                                     //   .with
                            } else {
                                return ImmutableDokument.builder().raw(result.getOcrResult().toString()).docSourceType(DocSourceType.OpticalMRZRaw).build();
                                // attempt to parse OCR result by yourself
                                // or ask user to try again
                            }
                        }
                    }
                    break;
                case CHIPLEST:
                    break;

                case CHIPSTATUSUPDATE:
                    String status = (String)action.value;
                    return ImmutableDokument.copyOf(dokument).withReadStatus(status);
                    //break;
                case CLEARDOCUMENT:
                    return buildDefault();
                 //   break;
                case UPDATEDG1:
                    DG1File dg1 = (DG1File) action.value;
                    MRZInfo chipMRZ = dg1.getMRZInfo();
                    if(null == chipMRZ)
                    {
                        return ImmutableDokument.copyOf(dokument);
                    }
                    return ImmutableDokument.copyOf(dokument)
                            .withDocSourceType(DocSourceType.ChipBAC)
                            .withDocumentNumber(chipMRZ.getDocumentNumber())
                     //       .withDateOfBirth(chipMRZ.getDateOfBirth())
                    //        .withDateOfExpiry = chipMRZ.getDateOfExpiry())
                    .withIssuer(chipMRZ.getIssuingState())
                    .withOpt1(chipMRZ.getOptionalData1())
                    .withOpt2(chipMRZ.getOptionalData2())
                    .withPrimaryId(chipMRZ.getPrimaryIdentifier())
                    .withSecondaryId(chipMRZ.getSecondaryIdentifier())
                    .withNationality(chipMRZ.getNationality())
                    .withDocumentCode(chipMRZ.getDocumentCode());

                 //   break;
            }
        }
        return dokument;
    }

    // opt2, dateOfBirth,
    public static ImmutableDokument buildDefault()
    {
        return ImmutableDokument.builder()
                .docSourceType(DocSourceType.OpticalMRZRaw)
                .readStatus("")
                .chiplest(false)
                .issuer("")
                .documentCode("")
                .resultType("")
                .documentCode("")
                .opt1("")
                .opt2("")
                .raw("")
                .dateOfBirth(new Date())
                .documentNumber("")
                .resultType("")
                .sex("")
                .dateOfExpiry(new Date())
                .nationality("")
                .secondaryId("")
                .primaryId("")
                .personImageByteArray(new byte[0])
                .build();
    }
}
