// tslint:disable:variable-name

const KBD_NONE = 0;
const KBD_0 = 48;
const KBD_1 = 49;
const KBD_2 = 50;
const KBD_3 = 51;
const KBD_4 = 52;
const KBD_5 = 53;
const KBD_6 = 54;
const KBD_7 = 55;
const KBD_8 = 56;
const KBD_9 = 57;
const KBD_a = 65;
const KBD_b = 66;
const KBD_c = 67;
const KBD_d = 68;
const KBD_e = 69;
const KBD_f = 70;
const KBD_g = 71;
const KBD_h = 72;
const KBD_i = 73;
const KBD_j = 74;
const KBD_k = 75;
const KBD_l = 76;
const KBD_m = 77;
const KBD_n = 78;
const KBD_o = 79;
const KBD_p = 80;
const KBD_q = 81;
const KBD_r = 82;
const KBD_s = 83;
const KBD_t = 84;
const KBD_u = 85;
const KBD_v = 86;
const KBD_w = 87;
const KBD_x = 88;
const KBD_y = 89;
const KBD_z = 90;
const KBD_f1 = 290;
const KBD_f2 = 291;
const KBD_f3 = 292;
const KBD_f4 = 293;
const KBD_f5 = 294;
const KBD_f6 = 295;
const KBD_f7 = 296;
const KBD_f8 = 297;
const KBD_f9 = 298;
const KBD_f10 = 299;
const KBD_f11 = 300;
const KBD_f12 = 301;

const KBD_kp0 = 320;
const KBD_kp1 = 321;
const KBD_kp2 = 322;
const KBD_kp3 = 323;
const KBD_kp4 = 324;
const KBD_kp5 = 325;
const KBD_kp6 = 326;
const KBD_kp7 = 327;
const KBD_kp8 = 328;
const KBD_kp9 = 329;

const KBD_kpperiod = 330;
const KBD_kpdivide = 331;
const KBD_kpmultiply = 332;
const KBD_kpminus = 333;
const KBD_kpplus = 334;
const KBD_kpenter = 335;

const KBD_esc = 256;
const KBD_tab = 258;
const KBD_backspace = 259;
const KBD_enter = 257;
const KBD_space = 32;
const KBD_leftalt = 342;
const KBD_rightalt = 346;
const KBD_leftctrl = 341;
const KBD_rightctrl = 345;
const KBD_leftshift = 340;
const KBD_rightshift = 344;
const KBD_capslock = 280;
const KBD_scrolllock = 281;
const KBD_numlock = 282;
const KBD_grave = 96;
const KBD_minus = 45;
const KBD_equals = 61;
const KBD_backslash = 92;
const KBD_leftbracket = 91;
const KBD_rightbracket = 93;
const KBD_semicolon = 59;
const KBD_quote = 39;
const KBD_period = 46;
const KBD_comma = 44;
const KBD_slash = 47;
const KBD_printscreen = 283;
const KBD_pause = 284;
const KBD_insert = 260;
const KBD_home = 268;
const KBD_pageup = 266;
const KBD_delete = 261;
const KBD_end = 269;
const KBD_pagedown = 267;
const KBD_left = 263;
const KBD_up = 265;
const KBD_down = 264;
const KBD_right = 262;
const KBD_extra_lt_gt = 348; // ???

const keycodes: {[index: number]: number} = {
    8: KBD_backspace,
    9: KBD_tab,
    13: KBD_enter,
    16: KBD_leftshift,
    17: KBD_leftctrl,
    18: KBD_leftalt,
    19: KBD_pause,
    27: KBD_esc,
    32: KBD_space,
    33: KBD_pageup,
    34: KBD_pagedown,
    35: KBD_end,
    36: KBD_home,
    37: KBD_left,
    38: KBD_up,
    39: KBD_right,
    40: KBD_down,
    45: KBD_insert,
    46: KBD_delete,
    48: KBD_0,
    49: KBD_1,
    50: KBD_2,
    51: KBD_3,
    52: KBD_4,
    53: KBD_5,
    54: KBD_6,
    55: KBD_7,
    56: KBD_8,
    57: KBD_9,
    59: KBD_semicolon,
    64: KBD_equals,
    65: KBD_a,
    66: KBD_b,
    67: KBD_c,
    68: KBD_d,
    69: KBD_e,
    70: KBD_f,
    71: KBD_g,
    72: KBD_h,
    73: KBD_i,
    74: KBD_j,
    75: KBD_k,
    76: KBD_l,
    77: KBD_m,
    78: KBD_n,
    79: KBD_o,
    80: KBD_p,
    81: KBD_q,
    82: KBD_r,
    83: KBD_s,
    84: KBD_t,
    85: KBD_u,
    86: KBD_v,
    87: KBD_w,
    88: KBD_x,
    89: KBD_y,
    90: KBD_z,
    // 91: KBD_left_super,
    // 93: KBD_menu,
    96: KBD_kp0,
    97: KBD_kp1,
    98: KBD_kp2,
    99: KBD_kp3,
    100: KBD_kp4,
    101: KBD_kp5,
    102: KBD_kp6,
    103: KBD_kp7,
    104: KBD_kp8,
    105: KBD_kp9,
    // 106: KBD_kpmultiply,
    // 107: KBD_kpadd,
    // 109: KBD_kpsubtract,
    // 110: KBD_kpdecimal,
    111: KBD_kpdivide,
    112: KBD_f1,
    113: KBD_f2,
    114: KBD_f3,
    115: KBD_f4,
    116: KBD_f5,
    117: KBD_f6,
    118: KBD_f7,
    119: KBD_f8,
    120: KBD_f9,
    121: KBD_f10,
    122: KBD_f11,
    123: KBD_f12,
    144: KBD_numlock,
    145: KBD_scrolllock,
    173: KBD_minus,
    186: KBD_semicolon,
    187: KBD_equals,
    188: KBD_comma,
    189: KBD_minus,
    190: KBD_period,
    191: KBD_slash,
    // 192: KBD_graveaccent,
    219: KBD_leftbracket,
    220: KBD_backslash,
    221: KBD_rightbracket,
    // 222: KBD_apostrophe,
    // 224: KBD_left_super,
}


export function domToKeyCode(domCode: number) {
    return keycodes[domCode] || 0;
}
