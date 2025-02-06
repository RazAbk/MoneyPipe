function success(...message: string[]) {
    console.log(`%c SUCCESS`, 'background: #008000; color: #fff; font-size: 14px; padding: 5px 5px 5px 0; border: 1px dashed #fff; border-radius: 5px;', ...message);
}

function error(...message: string[]) {
    console.log(`%c ERROR`, 'background: #FF0000; color: #fff; font-size: 14px; padding: 5px 5px 5px 0; border: 1px dashed #fff; border-radius: 5px;', ...message);
}

function warning(...message: string[]) {
    console.log(`%c ERROR`, 'background:  #FFA500; color: #fff; font-size: 14px; padding: 5px 5px 5px 0; border: 1px dashed #fff; border-radius: 5px;', ...message);
}

function info(...message: string[]) {
    console.log(`%c INFO`, 'background:  #808080; color: #fff; font-size: 14px; padding: 5px 5px 5px 0; border: 1px dashed #fff; border-radius: 5px;', ...message);
}

exports.Logger = {
    success,
    error,
    warning,
    info,
}