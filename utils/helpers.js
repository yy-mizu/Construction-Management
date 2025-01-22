import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "dayjs/locale/ja";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import isToday from "dayjs/plugin/isToday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { MATCHING_API_URL } from "./constants";

dayjs.extend(isToday);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

const jpDays = ["日", "月", "火", "水", "木", "金", "土"];

const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const allLowerAlpha = [..."abcdefghijklmnopqrstuvwxyz"];
const allUniqueChars = [..."~!@#$%^&*()_+-=[]{}|;:'\",./<>?"];
const allNumbers = [..."0123456789"];

export const generateToken = (length = 6) => {
  const base = [...allCapsAlpha, ...allLowerAlpha, ...allNumbers];
  return [...Array(length)]
    .map((i) => base[(Math.random() * base.length) | 0])
    .join("");
};

export function getJpDay(index) {
  return jpDays[index];
}

export function getDatesInMonth(month) {
  let dates = [];
  let dateContext = dayjs(month ? new Date(month) : new Date());
  const totalDays = dateContext.daysInMonth();
  let i = 1;
  while (i <= totalDays) {
    dates.push(dateContext.startOf("month").date(i));
    i++;
  }
  return dates;
}

/**
 * get dates between first monday and last sunday of a month
 * {Array} date object array
 *
 */

export function getAllDaysOfMonth(date) {
  // dayjs configuration
  dayjs.extend(isBetween);
  dayjs.locale("ja");

  let dateContext = dayjs(date);

  let startDateofFirstWeek =
    dateContext.startOf("month").day() === 0
      ? dateContext.startOf("month").day(-6)
      : dateContext.startOf("month").day(1); //first monday
  let lastDateofLastWeek =
    dateContext.endOf("month").day() === 0
      ? dateContext.endOf("month").day(0, "day")
      : dateContext.endOf("month").day(7, "day"); // if not last day is sunday, get next month sunday

  let datesArr = []; // dayjs date array

  let i = startDateofFirstWeek.clone();

  // push date from monday to sunday of all weeks of a month
  while (i.isBetween(startDateofFirstWeek, lastDateofLastWeek, "dates", [])) {
    datesArr.push(i);
    i = i.add(1, "day");
  }

  return datesArr;
}

/**
 * Return to previous route or fallback to url
 * @param {string} url fallback url
 */
export function redirectBack(url) {
  if (window.history.length > 1 && document.referrer != "") {
    window.history.back();
  } else {
    // window.location.assign(url)
    window.history.pushState({}, "", url);
  }
}

/**
 * detech screen size and return is mobile view or not
 *
 */
export function isMobileView(screenWidth) {
  return screenWidth < 992;
}
export function isSPView(screenWidth) {
  return screenWidth < 768;
}

/**
 * refresh token
 */
const refreshExpiredTokenClosure = () => {
  // console.log("get new token");
  let isCalled = false;
  let runningPromise = undefined;
  return () => {
    if (isCalled) {
      return runningPromise;
    } else {
      isCalled = true;
      runningPromise = getSession();
      return runningPromise;
    }
  };
};

// stores the function returned by refreshExpiredTokenClosure
const refreshExpiredToken = refreshExpiredTokenClosure();

// Fetcher for

let refreshingToken = null;

export const fetcher = async (...args) => {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    if (refreshingToken) {
      throw error;
    }
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    if (error.status === 403 && error.info?.message === "tenant-deleted") {
      signOut();
    }

    if (error.status === 401) {
      if (!refreshingToken) {
        refreshingToken = true;
        getSession()
          .then((res) => {
            if (
              res?.error === "RefreshAccessTokenError" ||
              error.info.message === "unauthorized-email-phone" ||
              error.info.message === "unauthorized-none-login"
            ) {
              signOut();
            } else {
              // console.log("....reload helper");
              // window.location.reload()
            }
          })
          .catch((err) => {
            throw error;
          })
          .finally(() => {
            refreshingToken = false;
          });
      }
    }
    throw error;
  }
  return res.json();
};

// check for base64
export function isBase64(encodedString) {
  if (encodedString) {
    return encodedString.includes("data:image/png;base64"); // return TRUE if its base64 string.
  }
  return false;
}

// matching image
export function getMatchingImage(image) {
  return image ? MATCHING_API_URL + "/get?file=" + image : "";
}

export function implodComma(arr, key) {
  return arr
    .map((e) => e[key])
    .filter(Boolean)
    .join("、");
}
// var companyWindow = null;
export function openLinkInNewTab(url) {
  window.open(url, "_blank");
  // console.log(companyWindow, "...com win");
  // if (companyWindow == null) {
  //     companyWindow = window.open(url, "_blank");
  // } else {
  //     console.log(5555);
  //     companyWindow.focus();
  // }
}

/**
 *
 * @param {array} arr  Array to be converted
 * @param {string} value key name
 * @param {string} label value name
 * @param {array} extra   [{'keyout': 'keyinput' }]
 * @returns  example [{value: 'abc', label: 'ABC'}]
 */
export function convertToSelect({ arr, value, label, extra }) {
  let tempArr = [];
  if (Array.isArray(arr)) {
    arr.map((item) => {
      let cust = {};
      if (extra && Array.isArray(extra)) {
        extra.map((sub) => {
          cust[Object.keys(sub)[0]] = item[Object.values(sub)[0]]; //
        });
      }
      tempArr.push({ value: item[value], label: item[label], ...cust });
    });
    return tempArr;
  }
  return tempArr;
}

/**Query */

export function concatAddress(addressPrefecture, addressCity, addressBuilding) {
  return (
    (addressPrefecture || "") + (addressCity || "") + (addressBuilding || "")
  );
}

/**
 * return HH:mm
 */
export function militaryTime(time) {
  let parts = time.split(":");
  return [parts[0]?.padStart(2, 0), parts[1]?.padStart(2, 0)].join(":");
}

/**
 * man power calculation
 *  (worker*hours)/8
 *
 */
export function calculateManpower(a, b) {
  return Number(((a * b) / 8).toFixed(2));
}

/**
 *
 * @param {array} arr  Array from Reace Select
 * @param {string} label value name
 * @returns  example ['aaa', 'bbb']
 */
// export function idExtractor({arr}){
//     let tempArr = [];
//     if(Array.isArray(arr)){
//         arr.map((item)=> tempArr.push({value: item[value], label: item[label] }))

//         console.log(tempArr)
//         return tempArr;
//     }
//     console.log('no array is recieved')
//     return tempArr;
// }

/**
 *
 * @param {Array} arr  Array of JS Date Object
 * @returns JS Date Object
 */
export function getMaxDate(arr) {
  const maxDate = new Date(
    Math.max(
      ...arr.map((element) => {
        return new Date(element.date);
      })
    )
  );
  return maxDate;
}

/**
 *
 * @param {Array} arr  Array of JS Date Object
 * @returns JS Date Object
 */
export function getMinDate(arr) {
  const minDate = new Date(
    Math.min(
      ...arr.map((element) => {
        return new Date(element);
      })
    )
  );
  return minDate;
}

// Validation

export function numberOnly(evt) {
  var x = evt.which || evt.keyCode;

  if (x === 13) return; // if enter key stop here;

  if (
    x === 8 ||
    x === 9 ||
    x === 46 ||
    (x >= 96 && x <= 105) ||
    (x >= 48 && x <= 57) ||
    (x >= 37 && x <= 40)
  ) {
  } else {
    evt.preventDefault();
    return false;
  }
}

export function numberAndDecimalOnly(evt) {
  var x = evt.which || evt.keyCode;
  if (x === 13) return; // if enter key stop here;
  if (x === 16) return;
  if (
    x === 8 ||
    x === 9 ||
    x === 46 ||
    x === 190 ||
    x === 110 ||
    (x >= 96 && x <= 105) ||
    (x >= 48 && x <= 57) ||
    (x >= 37 && x <= 40)
  ) {
  } else {
    evt.preventDefault();
    return false;
  }
}

export function setMaxValue(max) {
  if (e.target.value > max) e.target.value = max;
}

/*******FORMATTING */
export function formatPrice(e) {
  e.target.value = convertPrice(e.target.value);
}

export function convertPrice(value) {
  if (typeof value === undefined) return "";

  return value
    .toString()
    .replace(/\D/g, "")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}

/**
 * Chunk Array
 * @param {Array} array
 * @param {Number} size
 * @returns [arr1, arr2]
 */
export function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

export const queryStringToObject = (queryString) => {
  const params = new URLSearchParams(queryString);

  const result = {};
  for (const [key, value] of params.entries()) {
    // If the key already exists in the result object, handle it as an array
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  }
  // console.log(result)
  return result;
};

export const objectToQueryString = (obj) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach((item) => searchParams.append(key, item));
    } else {
      searchParams.append(key, value);
    }
  }

  return searchParams.toString();
};

/**
 *
 * @param {BinaryData} binaryMessage
 * @returns
 */
export const binaryMessageToJsonMessage = (binaryMessage) => {
  const uint8Array = new Uint8Array(binaryMessage);
  // Use TextDecoder to decode the binary data as UTF-8
  const decoder = new TextDecoder("utf-8");
  const jsonString = decoder.decode(uint8Array);
  return JSON.parse(jsonString);
};

export const areObjectsEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  // Compare keys and values regardless of order
  for (let key of keys1) {
    if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

// check if it's touch device
export function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

/**
 * Token Error Message
 * @param {json} response - GMO API response json
 * @return {string} message - token error message
 */
export function tokenMessage(response) {
  var tokenError = {
    "000": { field: "token", message: "トークン取得正常終了" },
    100: { field: "cardno", message: "カード番号を入力してください" },
    101: {
      field: "cardno",
      message: "カード番号は半角数字で入力してください",
    },
    102: { field: "cardno", message: "カード番号を正しく入力してください" },
    110: { field: "expire", message: "有効期限を入力してください" },
    111: {
      field: "expire",
      message: "有効期限は半角数字で入力してください",
    },
    112: { field: "expire", message: "有効期限を正しく入力してください" },
    113: { field: "expire", message: "有効期限を正しく入力してください" },
    121: {
      field: "securitycode",
      message: "セキュリティコードは半角数字で入力してください",
    },
    122: {
      field: "securitycode",
      message: "セキュリティコードを正しく入力してください",
    },
    131: { field: "holdername", message: "名義人を正しく入力してください" },
    132: { field: "holdername", message: "名義人を正しく入力してください" },
    141: "発行数フォーマットエラー(数字以外を含む)", // Support API (141-191)
    142: "発行数フォーマットエラー(1-10 の範囲外)",
    150: "カード情報を暗号化した情報必須チェックエラー",
    160: "ショップ ID 必須チェックエラー",
    161: "ショップ ID フォーマットエラー(14 桁以上)",
    162: "ショップ ID フォーマットエラー(半角英数字以外)",
    170: "公開鍵ハッシュ値必須チェックエラー",
    180: "ショップ ID または公開鍵ハッシュ値がマスターに存在しない",
    190: "カード情報(Encrypted)が復号できない",
    191: "カード情報(Encrypted)復号化後フォーマットエラー",
    E61010002: {
      field: "cardno",
      message: "カード番号を正しく入力してください",
    },
    E01230009: {
      field: "limit",
      message: "カード登録連番が最大登録可能数を超えています",
    },
    "42G120000": { field: "cardno", message: "このカードは利用できません" },

    // "501": "トークン用パラメータ(id)が送信されていない",
    // "502": "トークン用パラメータ(id)がマスターに存在しない",
    // "511": "トークン用パラメータ(cardInfo)が送信されていない",
    // "512": "トークン用パラメータ(cardInfo)が復号できない",
    // "521": "トークン用パラメータ(key)が送信されていない",
    // "522": "トークン用パラメータ(key)が復号できない",
    // "531": "トークン用パラメータ(callBack)が送信されていない",
    // "541": "トークン用パラメータ(hash)が存在しない",
    // "551": "トークン用 apikey が存在しない ID",
    // "552": "トークン用 apikey が有効ではない",
    // "901": "マルチペイメント内部のシステムエラー",
    // "902": "処理が混み合っている"
  };
  if (
    Object.keys(tokenError).map(String).includes(response.resultCode) == true ||
    Object.keys(tokenError).map(Number).includes(response.resultCode) == true
  ) {
    return tokenError[response.resultCode];
  } else {
    return "クレジットカードの認証に失敗しました。";
  }
}
//123,456
export function numberWithCommas(x) {
  return x?.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

//123,456
export function dayjsBrowserDate(date) {
  const format = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  return dayjs
    .tz(format, "GMT")
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone);
}

export function trimWhiteSpace(e) {
  e.target.value = e.target.value.trimStart();
}

/**
 * Re-create image with Canvas
 * @param {Image} image
 * @returns Promise with Image output
 */

export async function recreateImage(image, type, name) {
  return new Promise((resolve, reject) => {
    // Create a new canvas and context
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the canvas dimensions to match the image dimensions
    canvas.width = image.width;
    canvas.height = image.height;

    // Apply the default transformation to the context
    ctx.transform(1, 0, 0, 1, 0, 0);

    // Draw the image onto the canvas using the transformed context
    ctx.drawImage(image, 0, 0);

    // Convert the canvas to a blob and create a new File object
    canvas.toBlob(async function (blob) {
      const newFile = new File([blob], name, {
        type: blob.type,
      });
      var base64data;
      var reader = new FileReader();
      reader.onloadend = function () {
        base64data = reader.result;
        resolve({ file: newFile, img: base64data });
      };
      reader.readAsDataURL(blob);
    }, type);
  });
}

/**
 * Resize a base 64 Image
 * @param {String} base64 - The base64 string (must include MIME type)
 * @param {Number} maxWidth - The width of the image in pixels
 */
export async function resizeBase64Img(file, maxWidth) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = function () {
      // return resolve({data:fileReader.result, name:file.name, size: file.size, type: file.type});

      var i = new Image();
      i.onload = function () {
        var iWidth = i.width > maxWidth ? maxWidth : i.width;
        var iHeight = i.height;
        if (i.width > maxWidth) {
          iHeight = (maxWidth / i.width) * i.height;
        }

        // console.log( iWidth+", "+iHeight );
        var canvas = document.createElement("canvas");
        canvas.width = iWidth;
        canvas.height = iHeight;
        let context = canvas.getContext("2d");
        let img = document.createElement("img");
        img.src = fileReader.result;
        img.onload = function () {
          // Apply the default transformation to the context
          context.transform(1, 0, 0, 1, 0, 0);
          context.drawImage(img, 0, 0, iWidth, iHeight);
          resolve({
            data: canvas.toDataURL(),
            name: file.name,
            beforeSize: file.size,
            size: Math.round((canvas.toDataURL().length * 6) / 8),
            type: file.type,
          });
        };
      };
      i.src = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  });
}

/**
 *
 * @param {File} file
 * @param {number} maxWidth
 * @returns {Promise<{file: File, img: String, type: String}>} Binary File, Base64Decoded Image
 */
export async function resizeImage(file, maxWidth) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: file.type,
  };
  return new Promise(async (resolve, reject) => {
    try {
      const blob = await imageCompression(file, options);
      const base64Img = await imageCompression.getDataUrlFromFile(blob);
      const newFile = new File([blob], file.name, {
        type: blob.type,
      });
      resolve({ file: newFile, img: base64Img, type: blob.type });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * detech ipaddress
 *
 */
export function isIpAddress(ipAddress) {
  const ipAddressPattern =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  return ipAddressPattern.test(ipAddress);
}

// check for emoji
export function isContainEmoji(str) {
  const regexpEmojiPresentation = /\p{Emoji_Presentation}/gu;
  return regexpEmojiPresentation.test(str);
}

// export const urlAddress = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export const urlAddress =
  /^(?:(?:(?:https?|ftp):)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)?(?:facebook\.com\/(?:[^/]+\/)+[^/]+\/?|instagram\.com\/(?:[^/]+\/)+[^/]+\/?|[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*))$/;

export function bytesToSize(bytes) {
  if (bytes * 1024) {
    const num = bytes / 1024; // 1 MB = 1024 KB return kb / 1024; /Number
    const ee = String(num).slice(0, 3);
    const integerPart = parseInt(ee).toString();
    return integerPart + " KB";
  }
}
