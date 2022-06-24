import { ErrorGedcomDecoding } from '../error';
import { BYTES_INTERVAL } from './common';
import { FileDecoder } from './FileDecoder';

const ANSEL_KEYS_1 = '8d8ea1a2a3a4a5a6a7a8a9aaabacadaeb0b1b2b3b4b5b6b7b8b9babcbdc0c1c2c3c4c5c6cfe0e1e2e3e4e5e6e7e9eaebecedeeeff0f1f2f3f4f5f6f7f8f9fafbfe818889929394c7c8e8bebfcdce';
const ANSEL_VALUES_1 = '\u200d\u200c\u0141\xd8\xd0\xde\xc6\u0152\u02b9\xb7\u266d\xae\xb1\u01a0\u01af\u02be\xb0\u0142\xf8\u0111\xfe\xe6\u0153\u02ba\u0131\xa3\xf0\u01a1\u01b0\xb0\u2113\u2117\xa9\u266f\xbf\xa1\xdf\u0309\u0300\u0301\u0302\u0303\u0304\u0306\u0307\u030c\u030a\ufe20\ufe21\u0315\u030b\u0310\u0327\u0328\u0323\u0324\u0325\u0333\u0332\u0326\u031c\u032e\ufe22\ufe23\u0313\xfc\x98\x9c\'\u201c\u201d\xdf\u20ac\u0308\u25af\u25aeeo';
const ANSEL_KEYS_2 = 'e020e041e045e049e04fe055e059e061e065e069e06fe075e079e120e141e145e149e14fe155e157e159e161e165e169e16fe175e177e179e220e241e243e245e247e249e24be24ce24de24ee24fe250e252e253e255e257e259e25ae261e263e265e267e269e26be26ce26de26ee26fe270e272e273e275e277e279e27ae2a5e2b5e320e341e343e345e347e348e349e34ae34fe353e355e357e359e35ae361e363e365e367e368e369e36ae36fe373e375e377e379e37ae420e441e445e449e44ee44fe455e456e459e461e465e469e46ee46fe475e476e479e520e541e545e547e549e54fe555e561e565e567e569e56fe575e5a5e5b5e620e641e645e647e649e64fe655e661e665e667e669e66fe675e720e742e743e744e745e746e747e748e749e74de74ee750e752e753e754e757e758e759e75ae762e763e764e765e766e767e768e76de76ee770e772e773e774e777e778e779e77ae820e841e845e848e849e84fe855e857e858e859e861e865e868e869e86fe874e875e877e878e879e920e941e943e944e945e947e949e94be94ce94ee94fe952e953e954e955e95ae961e963e964e965e967e969e96ae96be96ce96ee96fe972e973e974e975e97aea20ea41ea61ea75ea77ea79eaaded20ee20ee4fee55ee6fee75f020f043f044f047f048f04bf04cf04ef052f053f054f063f064f067f068f06bf06cf06ef072f073f074f120f141f145f149f14ff155f161f165f169f16ff175f241f242f244f245f248f249f24bf24cf24df24ef24ff252f253f254f255f256f257f259f25af261f262f264f265f268f269f26bf26cf26df26ef26ff272f273f274f275f276f277f279f27af355f375f441f461f520f948f968fc20fc41fc43fc45fc4bfc4cfc4ffc51fc54fc56fc61fc63fc65fc6bfc6cfc6ffc71fc74fc76d741d742d743d744d745d746d747d748d749d74ad74bd74cd74dd74ed74fd750d751d752d753d754d755d756d757d758d761d762d763d764d765d766d767d768d769d76ad76bd76cd76dd76ed76fd770d771d772d773d774d775d776d777d778d779d824d841d842d843d844d845d846d847d848d849d84bd84cd84dd84ed84fd850d851d852d853d854d855d856d857d858d85ad861d862d863d864d865d866d867d868d869d86bd86cd86dd86ed86fd870d871d872d873d874d875d876d877d878d87ad920d921d922d923d924d925d926d927d928d929d92ad92bd92cd92dd92ed92fd930d931d932d933d941d942d943d944d945d946d947d948d949d94ad94cd94dd94ed94fd950d951d952d953d954d955d956d957d958d959d95ad961d962d963d964d965d966d967d968d969d96ad96bd96cd96dd96ed96fd970d971d972d973d974d975d976d977d979d97ad97bd97c';
const ANSEL_VALUES_2 = '\u02c0\u1ea2\u1eba\u1ec8\u1ece\u1ee6\u1ef6\u1ea3\u1ebb\u1ec9\u1ecf\u1ee7\u1ef7\u02cb\xc0\xc8\xcc\xd2\xd9\u1e80\u1ef2\xe0\xe8\xec\xf2\xf9\u1e81\u1ef3\u02ca\xc1\u0106\xc9\u01f4\xcd\u1e30\u0139\u1e3e\u0143\xd3\u1e54\u0154\u015a\xda\u1e82\xdd\u0179\xe1\u0107\xe9\u01f5\xed\u1e31\u013a\u1e3f\u0144\xf3\u1e55\u0155\u015b\xfa\u1e83\xfd\u017a\u01fc\u01fd\u02c6\xc2\u0108\xca\u011c\u0124\xce\u0134\xd4\u015c\xdb\u0174\u0176\u1e90\xe2\u0109\xea\u011d\u0125\xee\u0135\xf4\u015d\xfb\u0175\u0177\u1e91\u02dc\xc3\u1ebc\u0128\xd1\xd5\u0168\u1e7c\u1ef8\xe3\u1ebd\u0129\xf1\xf5\u0169\u1e7d\u1ef9\u02c9\u0100\u0112\u1e20\u012a\u014c\u016a\u0101\u0113\u1e21\u012b\u014d\u016b\u01e2\u01e3\u02d8\u0102\u0114\u011e\u012c\u014e\u016c\u0103\u0115\u011f\u012d\u014f\u016d\u02d9\u1e02\u010a\u1e0a\u0116\u1e1e\u0120\u1e22\u0130\u1e40\u1e44\u1e56\u1e58\u1e60\u1e6a\u1e86\u1e8a\u1e8e\u017b\u1e03\u010b\u1e0b\u0117\u1e1f\u0121\u1e23\u1e41\u1e45\u1e57\u1e59\u1e61\u1e6b\u1e87\u1e8b\u1e8f\u017c\xa8\xc4\xcb\u1e26\xcf\xd6\xdc\u1e84\u1e8c\u0178\xe4\xeb\u1e27\xef\xf6\u1e97\xfc\u1e85\u1e8d\xff\u02c7\u01cd\u010c\u010e\u011a\u01e6\u01cf\u01e8\u013d\u0147\u01d1\u0158\u0160\u0164\u01d3\u017d\u01ce\u010d\u010f\u011b\u01e7\u01d0\u01f0\u01e9\u013e\u0148\u01d2\u0159\u0161\u0165\u01d4\u017e\u02da\xc5\xe5\u016f\u1e98\u1e99\u016e\u02bc\u02dd\u0150\u0170\u0151\u0171\xb8\xc7\u1e10\u0122\u1e28\u0136\u013b\u0145\u0156\u015e\u0162\xe7\u1e11\u0123\u1e29\u0137\u013c\u0146\u0157\u015f\u0163\u02db\u0104\u0118\u012e\u01ea\u0172\u0105\u0119\u012f\u01eb\u0173\u1ea0\u1e04\u1e0c\u1eb8\u1e24\u1eca\u1e32\u1e36\u1e42\u1e46\u1ecc\u1e5a\u1e62\u1e6c\u1ee4\u1e7e\u1e88\u1ef4\u1e92\u1ea1\u1e05\u1e0d\u1eb9\u1e25\u1ecb\u1e33\u1e37\u1e43\u1e47\u1ecd\u1e5b\u1e63\u1e6d\u1ee5\u1e7f\u1e89\u1ef5\u1e93\u1e72\u1e73\u1e00\u1e01\u2017\u1e2a\u1e2b\u0338\u023a\u023b\u0246\ua742\u0141\xd8\ua758\u023e\ua75e\u2c65\u023c\u0247\ua743\u0142\xf8\ua759\u2c66\ua75f\u2550\u2551\u2557\u255d\u255a\u2554\u2563\u2569\u2560\u2566\u256c\u2562\u2567\u255f\u2564\u2561\u2568\u255e\u2565\u256a\u2591\u2592\u2593\u2588\u2500\u2502\u2510\u2518\u2514\u250c\u2524\u2534\u251c\u252c\u253c\u2555\u255b\u2558\u2552\u2556\u255c\u2559\u2553\u256b\u258c\u2580\u2590\u2584\u25aa\u03c2\u0391\u0392\u03a5\u0394\u0395\u03a6\u0393\u03a8\u0399\u039a\u039b\u039c\u039d\u039f\u03a0\u03a7\u03a1\u03a3\u03a4\u03a9\u0398\u0397\u039e\u0396\u03b1\u03b2\u03c5\u03b4\u03b5\u03c6\u03b3\u03c8\u03b9\u03ba\u03bb\u03bc\u03bd\u03bf\u03c0\u03c7\u03c1\u03c3\u03c4\u03c9\u03b8\u03b7\u03be\u03b6\u0e3f\xa2\xa5\u20a7\u0192\xa4\u20a4\u20a0\u20a1\u20a2\u20a3\u20a5\u20a6\u20a8\u20a9\u20aa\u20ac\xb9\xb2\xb3\xaa\xba\xab\xbb\xa6\xb6\xa7\u2310\u2020\u2021\u2122\ufb01\ufb02\u2039\u203a\u2030\u2026\u201c\u201d\u201a\u201e\u2022\u2013\xa0\xb5\xbd\xbc\xbe\u221e\u2205\u2208\u2229\xac\u2261\xd7\u2265\u2264\xf7\u2248\u22c5\u2320\u2321\u221a\u2044\u2018\u2019\u2014\xad\u20ad\u20ae\u20af\u20ab';

const REPLACEMENT_CHARACTER = '\ufffd';

export const decodeAnsel: FileDecoder = (buffer, progressCallback?, strict?: boolean) => {
    if (progressCallback) {
        progressCallback(0);
    }

    const createTable = (keys: string, keysStride: number, values: string): Map<number, number> => {
        const map = new Map<number, number>();
        for (let i = 0; i < keys.length; i++) {
            map.set(parseInt(keys.substring(i * keysStride, (i + 1) * keysStride), 16), values.charCodeAt(i));
        }
        return map;
    };
    const table1 = createTable(ANSEL_KEYS_1, 2, ANSEL_VALUES_1), table2 = createTable(ANSEL_KEYS_2, 4, ANSEL_VALUES_2);

    const byteBuffer = new Uint8Array(buffer);

    const output = [];
    let i = 0;
    let pending = byteBuffer[i];
    i++;
    while (pending !== undefined) {
        const b = pending;
        pending = byteBuffer[i];
        i++;
        if (b < 128) { // Unchanged ASCII
            output.push(String.fromCharCode(b));
        } else if (pending !== undefined && ((b >= 0xE0 && b <= 0xFF) || (b >= 0xD7 && b <= 0xD9))) {
            // Two bytes
            const code = b * 256 + pending;
            const u = table2.get(code);
            if (u !== undefined) {
                pending = byteBuffer[i];
                i++;
                output.push(String.fromCharCode(u));
            } else if (!strict) {
                pending = byteBuffer[i];
                i++;
                output.push(REPLACEMENT_CHARACTER);
            } else {
                throw new ErrorGedcomDecoding(`Illegal ANSEL character code: ${code}`, code);
            }
        } else {
            // One byte
            const u = table1.get(b);
            const c = String.fromCharCode(u !== undefined ? u : 0xFFFD);
            output.push(c);
        }

        if (progressCallback && i % BYTES_INTERVAL === 0) {
            progressCallback(i);
        }
    }

    if (progressCallback) {
        progressCallback(i);
    }

    return output.join('');
};
