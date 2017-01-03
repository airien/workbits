package no.politiet.chipwrapper;

import android.graphics.Bitmap;

import org.jmrtd.cbeff.StandardBiometricHeader;
import org.jmrtd.lds.COMFile;
import org.jmrtd.lds.DG1File;
import org.jmrtd.lds.DG2File;
import org.jmrtd.lds.DG3File;
import org.jmrtd.lds.FaceInfo;
import org.jmrtd.lds.MRZInfo;
import org.jmrtd.lds.SODFile;

import java.util.List;

/**
 * Created by christervaas on 28/06/16.
 */
public class ChipData {

    public COMFile comFile;
    public SODFile sodFile;
    public DG1File dg1File;
    public DG2File dg2File;
    public Bitmap dg2Bitmap;
    public byte[] dg1ByteArray;
    public boolean isPaceAuthenticated = false;
    public boolean isSuccess = true;
    public String exceptionMessage;
    public String stackTrace;
}
