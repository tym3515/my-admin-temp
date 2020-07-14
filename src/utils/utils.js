import {fileTypes, xlsTypes} from '../config';
// const urlParser = new UrlParse(window.location.href, true);

/**
 * Create a function which will call the callback function
 * after the given amount of milliseconds has passed since
 * the last time the callback function was called.
 */
export const idle = (callback, delay) =>
{
    let handle;

    return () =>
    {
        if (handle)
        {
            clearTimeout(handle);
        }

        handle = setTimeout(callback, delay);
    };
};

/** * 是否为mac系统（包含iphone手机） * */
export const isMac = function()
{
    return /macintosh|mac os x/i.test(navigator.userAgent);
}();

/** * 是否为windows系统 * */
export const isWindows = function()
{
    return /windows|win32/i.test(navigator.userAgent);
}();

export function random(min, max)
{
    let str ='';

    for (let i = 0; i < max; i++)
    {
        str+= Math.floor((Math.random() * (max - min + 1)) + min);
    }

    return Number(str);
}

// 移动端元素拖拽
export function DragAndDrop(ele, left=1, right=30, top=10, bottom=30)
{
    
    const clientWidth = document.documentElement.clientWidth || document.body.offsetWidth;
    const clientHeight = document.documentElement.clientHeight || document.body.offsetHeight;

    let flag = false;

    const cur = {
        x : 0,
        y : 0
    };

    let nx,
        ny,
        dx,
        dy,
        x,
        y;

    function down(event)
    {
        flag = true;
        let touch;

        if (event.touches)
        {
            touch = event.touches[0];
        }
        else
        {
            touch = event;
        }
        cur.x = touch.clientX;
        cur.y = touch.clientY;
        dx = ele.offsetLeft;
        dy = ele.offsetTop;
    }
    function move(event)
    {
        if (flag)
        {
            let touch;

            if (event.touches)
            {
                touch = event.touches[0];
            }
            else
            {
                touch = event;
            }
            nx = touch.clientX - cur.x;
            ny = touch.clientY - cur.y;
            x = dx + nx;
            y = dy + ny;

            if (x <= left)
                x = left;
            if (x >= clientWidth - right)
                x = clientWidth - right;
            if (y <= top)
                y = top;
            if (y >= clientHeight - bottom)
                y = clientHeight - bottom;

            ele.style.left = `${x }px`;
            ele.style.top = `${y }px`;

            // 阻止页面的滑动默认事件
            document.addEventListener('touchmove', function(event)
            {
                event.preventDefault();
            }, false);
        }
    }
    // 鼠标释放时候的函数
    function end()
    {
        flag = false;
    }

    ele.addEventListener('touchstart', function(event)
    {
        down(event);
    }, false);
    ele.addEventListener('touchmove', function(event)
    {
        move(event);
    }, false);
    ele.addEventListener('touchend', function(event)
    {
        end(event);
    }, false);
}

export function strSplit(str)
{
    return parseFloat(str).toLocaleString()
        .replace(/,/gi, '-');
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function toFirst(arr, index)
{
    if (index!==0)
    {

        // fieldData[index] = fieldData.splice(0, 1, fieldData[index])[0]; 这种方法是与另一个元素交换了位子，

        arr.unshift(arr.splice(index, 1)[0]);
    }

    return arr;
}

export function isIncludes(array, arr)
{
    return array.find((item, index, arr)=>
        arr.slice(index, index + arr.length).toString() === arr.toString()) !== undefined;
}

export function diffArray(array, arr)
{
    return array.filter((item)=>!arr.includes(item));
}
// 交集
export function intersection(array, arr)
{
    return array.filter(function(v){ return arr.indexOf(v) > -1 });
}
// 并集
// var union = a.concat(b.filter(function(v) {
//     return a.indexOf(v) === -1})) // [1,2,3,4,5]
// 交集
// var intersection = a.filter(function(v){ return b.indexOf(v) > -1 }) // [2]
// 差集
// var difference = a.filter(function(v){ return b.indexOf(v) === -1 }).concat(b.filter(function(v){ return a.indexOf(v) === -1 })) // [1,3,4,5]

export function getBase64(img, callback)
{
    const reader = new FileReader();
    
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export function validFileType(file, callback)
{
    const arr=file.name.split('.');
    const last=arr[arr.length-1];
    
    if (fileTypes.includes(`.${last}`.toLowerCase()))
    {
        return true;
    }
    
    return false;
}

export function validXlsFileType(file, callback)
{
    const arr=file.name.split('.');
    const last=arr[arr.length-1];
    
    if (xlsTypes.includes(`.${last}`.toLowerCase()))
    {
        return true;
    }
    
    return false;
}

export function getUrl(url){
    if (url) {
        //判断是否符合http:// https 或者base64符合返回真不符合返回假
        var http = /^(http:|https:)\/\/.*/i.test(url);
        var base64Url = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@?%\s]*?)\s*$/i.test(url);
        
        //如果两个都为假，我们就为客户添加http://
        if (!http && !base64Url) {
            url = 'http://storage.uwedding.com.cn' + url;
        }
        
        return url;
    }else{
        return '';
    }
}

export function flat(arr) {
    const res = [];
    
    for (const item of arr) {
        if (Array.isArray(item)) {
            res.push(...flat(item))
        } else {
            res.push(item);
        }
    }
    
    return res;
}
