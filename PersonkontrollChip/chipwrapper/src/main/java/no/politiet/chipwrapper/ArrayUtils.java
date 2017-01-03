package no.politiet.chipwrapper;

import java.util.ArrayList;

/**
 * Created by hanne.roos on 07.12.2016.
 */

public class ArrayUtils {
    private ArrayUtils() {}

    public static byte[] toByteArray (ArrayList<byte[]> list) {
        int len = 0;
        for (byte[] array : list) {
            if (array != null) {
                len += array.length;
            }
        }

        byte[] result = new byte[len];

        int index = 0;
        for (byte[] array : list) {
            if (array != null) {
                java.lang.System.arraycopy(array, 0, result, index, array.length);
                index += array.length;
            }
        }
        return result;
    }
}