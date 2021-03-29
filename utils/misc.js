module.exports = function logPrettifier() {
    console.infoCopy = console.info.bind(console);
    console.info = function(data){
        data += "\033[39m"
        const time = '\x1B[34m[' + new Date().toLocaleString("bg-BG") + '] :';
        console.infoCopy(time, data);
    };

    console.errCopy = console.error.bind(console);
    console.error = function(data){
        data += "\033[39m"
        const time = '\033[31m[' + new Date().toLocaleString("bg-BG") + '] :';
        console.errCopy(time, data);
    };
}
