const DEBUG_MODE = false;
const PAGINATION_LIMIT = 10; // default
const CSV_HARD_CAP = 5000;
const MAX_INT10_NUMBER = 4294967295;
const TEXT_MAX_LENGTH = 255;
const TEXTAREA_MAX_LENGTH = 65535;

const LENGTH_TEXT_MSG = `must be from 2 to ${TEXT_MAX_LENGTH} chars long`;
const LENGTH_PROMOCODE_MSG = 'must be from 3 to 25 chars long';
const LENGTH_TEXTAREA_MSG = `must be from 2 to ${TEXT_MAX_LENGTH} chars long`;
const LENGTH_MAXINT_MSG = `must be number from 1 to ${MAX_INT10_NUMBER}`;
const INVALID_DATE_ISO8601 = 'must be date in ISO8601 format <2020-11-13T00:00:00+08:00>';

const RALPH_PRIVATE_BUCKET = process.env.RALPH_RESOURCE_BUCKET;
const ALBUM_PROMO_CODES = process.env.RALPH_RESOURCE_PROMOCODE;
const PUBLICATIONS_ALBUM = process.env.PUBLICATIONS_ALBUM;
const PRIZE_TYPES = {
    P: { code: 'P', name: 'Physical voucher (to be mailed)' },
    C: { code: 'C', name: 'Credit Points' },
    W: { code: 'W', name: 'Wheel' },
    E: { code: 'E', name: 'E Vouchers' },
    ED: { code: 'ED', name: 'E Vouchers (dynamic URL)' },
    PC: { code: 'PC', name: 'Personal Collection Deals' },
};
const PRIZE_CATEGORY = ['H', 'O', 'Z'];
const QUE_TYPES = {
    csv: 'csv'
};
const QUE_STATUS = ['Pending', 'In-Progress', 'Outstanding', 'Completed'];
const REDIS_PROMO_KEY = process.env.E_VOUCHER_NOTIFY;
const BADGES = ['diamond', 'star', 'rocket','beginner'];
const REWARD_TYPE = ['normal', 'valuable'];

module.exports = {
    DEBUG_MODE,
    PAGINATION_LIMIT,
    CSV_HARD_CAP,
    MAX_INT10_NUMBER,
    PRIZE_TYPES,
    PRIZE_CATEGORY,
    ALBUM_PROMO_CODES,
    QUE_TYPES,
    RALPH_PRIVATE_BUCKET,
    QUE_STATUS,
    REDIS_PROMO_KEY,
    PUBLICATIONS_ALBUM,
    TEXT_MAX_LENGTH,
    TEXTAREA_MAX_LENGTH,
    LENGTH_TEXT_MSG,
    LENGTH_TEXTAREA_MSG,
    LENGTH_MAXINT_MSG,
    LENGTH_PROMOCODE_MSG,
    INVALID_DATE_ISO8601,
    BADGES,
    REWARD_TYPE
};