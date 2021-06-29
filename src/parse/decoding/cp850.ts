// Generated according to https://en.wikipedia.org/wiki/Code_page_437
import {FileDecoder} from "./FileDecoder";

const CP850_TABLE = '\xc7\xfc\xe9\xe2\xe4\xe0\xe5\xe7\xea\xeb\xe8\xef\xee\xec\xc4\xc5\xc9\xe6\xc6\xf4\xf6\xf2\xfb\xf9\xff\xd6\xdc\xf8\xa3\xd8\xd7\u0192\xe1\xed\xf3\xfa\xf1\xd1\xaa\xba\xbf\xae\xac\xbd\xbc\xa1\xab\xbb\u2591\u2592\u2593\u2502\u2524\xc1\xc2\xc0\xa9\u2563\u2551\u2557\u255d\xa2\xa5\u2510\u2514\u2534\u252c\u251c\u2500\u253c\xe3\xc3\u255a\u2554\u2569\u2566\u2560\u2550\u256c\xa4\xf0\xd0\xca\xcb\xc8\u0131\xcd\xce\xcf\u2518\u250c\u2588\u2584\xa6\xcc\u2580\xd3\xdf\xd4\xd2\xf5\xd5\xb5\xfe\xde\xda\xdb\xd9\xfd\xdd\xaf\xb4\xad\xb1\u2017\xbe\xb6\xa7\xf7\xb8\xb0\xa8\xb7\xb9\xb3\xb2';

export const decodeCp850: FileDecoder = buffer => {
    const byteBuffer = new Uint8Array(buffer);
    let outputView = '';
    for(let i = 0; i < byteBuffer.length; i++) {
        const code = byteBuffer[i];
        outputView += code < 128 ? String.fromCharCode(code) : CP850_TABLE.charAt(code - 128);
    }
    return outputView;
};
