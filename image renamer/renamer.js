var fs = require('fs');
var path = require('path')

for(let i = 0; i <= 100; i++){
    let twat = i + ''
    let num = twat.length < 2 ? `0` + twat : twat

    let picPath = path.join(__dirname, `/eth_teal_mat1_frameDefault_${num}.png`)
    let newName = path.join(__dirname, `/${i}.png`)
    if(fs.existsSync(picPath)){
        fs.renameSync(picPath, newName, function(err) {
            if ( err ) {
                console.log('ERROR: ' + err);
                setTimeout(function () {
                    process.exit();
                }, 10000);
            }
        });
    } else {
        console.log('UNFOUND: ', picPath, newName)
    }
};

console.log('done.')

setTimeout(function () {
    process.exit();
}, 10000);