var argv = require("argv");

argv.option({
	name: 'input',
	short: 'i',
	type : 'string',
	description :'入力ファイル',
	example: "'node index.js  -s 45 -e 5 -f 10 -c 0.1'"
});

argv.option({
	name: 'dest',
	short: 'd',
	type : 'string',
	description :'あなたのスクリプトのオプションを定義します',
	example: "'script --option=value' or 'script -o value'"
});

argv.option({
	name: 'start',
	short: 's',
	type : 'int',
	description :'あなたのスクリプトのオプションを定義します',
	example: "'script --option=value' or 'script -o value'"
});

argv.option({
	name: 'end',
	short: 'e',
	type : 'int',
	description :'あなたのスクリプトのオプションを定義します',
	example: "'script --option=value' or 'script -o value'"
});

argv.option({
	name: 'framerate',
	short: 'f',
	type : 'int',
	description :'あなたのスクリプトのオプションを定義します',
	example: "'script --option=value' or 'script -o value'"
});

argv.option({
	name: 'convert',
	short: 'c',
	type : 'float',
	description :'あなたのスクリプトのオプションを定義します',
	example: "'script --option=value' or 'script -o value'"
});

var arg = argv.run().options;

var fileName = arg.input;
console.log(arg);
var destName = arg.dest;
var startTime = arg.start;
var time = arg.end;
var rate = arg.framerate;
var resize = arg.convert;

if (fileName == null){
  console.log("ファイルが指定されてない");
  return;
}

var exec = require('child_process').exec;

var rateText = rate == null ? "" : "  -r " + rate +" ";
var endText = time == null ? "" : "  -t " + time +" ";
var startText = startTime == null ? "" : " -ss " + startTime +" ";
var resizeText = resize == null ? "" : "-resize " + 100 * resize + "%";

var cmd1 = 'rm -rf testDir; mkdir testDir; ffmpeg -i ' + fileName + rateText + endText + startText +  ' testDir/test_' + fileName +  ' ';
var cmd2 = "ffmpeg -i " + ' testDir/test_' + fileName +  " testDir/%04d.png";
var cmd3 = "convert " + resizeText + "  testDir/*.png out.gif ; rm -rf testDir;";
console.log(cmd1);
exec(cmd1, function (error, stdout, stderr) {
  if(stdout){
    console.log('stdout: ' + stdout);
    runCmd2();
  }
  if(stderr){
    console.log('stderr: ' + stderr);
    runCmd2();
  }
  if (error !== null) {
    console.log('Exec error: ' + error);
  }
});

function runCmd2 (){

  exec(cmd2, function (error, stdout, stderr) {
    if(stdout){
      console.log('stdout: ' + stdout);
      runCmd3();
    }
    if(stderr){
      console.log('stderr: ' + stderr);
      runCmd3();
    }
    if (error !== null) {
      console.log('Exec error: ' + error);
    }
  });

}


function runCmd3 (){

  exec(cmd3, function (error, stdout, stderr) {
    if(stdout){
      console.log('stdout: ' + stdout);
    }
    if(stderr){
      console.log('stderr: ' + stderr);
    }
    if (error !== null) {
      console.log('Exec error: ' + error);
    }
  });

}



