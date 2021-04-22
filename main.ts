// first sub-process:
const runNodeProcess = async () => {
  const nodeProcess = Deno.run({
    cmd: [
        "node", 
        "./scripts/counter.js"
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { code } = await nodeProcess.status();
  const rawOutput = await nodeProcess.output();
  const rawError  = await nodeProcess.stderrOutput();

  if (code === 0) {
    await Deno.stdout.write(rawOutput);
    console.log('Finished Node.js process...');
  } 
  else {
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }
}

// second sub-process:
const buildCppExe = async () => {
  const pwd = '/home/eduard/Development/Tutorials/deno_subprocess/';  
  const compileProcess = Deno.run({
    cmd: [
        "g++",  
        "-o",
        "../../../bin/counter",
        "./scripts/main.cpp"       
    ],
    stdout: "piped",
    stderr: "piped",
    cwd: pwd
  }); 

  const build = await compileProcess.status();
  const output2 = await compileProcess.output();
  const error2  = await compileProcess.stderrOutput();

  if (build.code === 0) {
    await Deno.stdout.write(output2);
    console.log('Finished C++ build process...');
  } 
  else {
    console.error('Here...');
    const errorString = new TextDecoder().decode(error2);
    console.log(errorString);
  }
}

// third sub-process:
const runCppProcess = async () => {
  const runMain = Deno.run({
    cmd: [
      "../../../bin/counter"
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const resultMain = await runMain.status();
  const output3 = await runMain.output();
  const error3  = await runMain.stderrOutput();
    
  if(resultMain.code === 0)  {
    await Deno.stdout.write(output3);    
    console.log('Finished running counter exe...');
  } else {
    const errorString = new TextDecoder().decode(error3);
    console.log(errorString);
  }
}

const main = async () => {
  await runNodeProcess();
  await buildCppExe();
  await runCppProcess();
}

main();
