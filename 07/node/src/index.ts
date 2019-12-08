const fs = require("fs");
const path = require("path");
const inputPath = path.join(__dirname, "../input");

const operation: Record<string, string> = {
  "01": "ADD",
  "02": "MULTIPLY",
  "03": "INPUT",
  "04": "OUTPUT",
  "05": "JUMP_IF_TRUE",
  "06": "JUMP_IF_FALSE",
  "07": "LESS_THAN",
  "08": "EQUALS",
  "99": "HALT"
};

const NUM_PARAMS: Record<string, number> = {
  ADD: 3,
  MULTIPLY: 3,
  INPUT: 1,
  OUTPUT: 1,
  JUMP_IF_TRUE: 2,
  JUMP_IF_FALSE: 2,
  LESS_THAN: 3,
  EQUALS: 3,
  HALT: 0
};

const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;

const INPUT_VALUE = 5;
abstract class Instruction {
  constructor(
    protected opcode: number,
    protected length: number,
    protected params: number[],
    protected modes: number[],
    protected memory: number[]
  ) {}
  getValue(paramIndex: number) {
    if (this.modes[paramIndex] === IMMEDIATE_MODE) {
      return this.params[paramIndex];
    }
    return this.memory[this.params[paramIndex]];
  }
  setValue(paramAddressIndex: number, value: number) {
    this.memory[this.params[paramAddressIndex]] = value;
  }
  protected abstract call(): void;
}
class Add extends Instruction {
  call() {
    const x = this.getValue(0);
    const y = this.getValue(1);
    this.setValue(2, x + y);
  }
}
class Multiply extends Instruction {
  call() {
    const x = this.getValue(0);
    const y = this.getValue(1);
    this.setValue(2, x * y);
  }
}
class Input extends Instruction {
  call() {
    this.setValue(0, INPUT_VALUE);
  }
}

class JumpIfTrue extends Instruction{
  call(){
    const inValue = this.getValue(0);
    const outValue = this.getValue(1);
    if(inValue){
      return outValue;
    }
  }
}
class JumpIfFalse extends Instruction{
  call(){
    const inValue = this.getValue(0);
    const outValue = this.getValue(1);
    if(!inValue){
      return outValue;
    }
  }
}

class LessThan extends Instruction{
  call(){
    const x = this.getValue(0);
    const y = this.getValue(1);
    const outValue = Number(x < y)
    this.setValue(2, outValue)
  }
}

class Equals extends Instruction{
  call(){
    const x = this.getValue(0);
    const y = this.getValue(1);
    const outValue = Number(x === y)
    this.setValue(2, outValue)
  }
}

class Output extends Instruction {
  call() {
    console.log(`Output: ${this.getValue(0)}`);
  }
}

class Halt extends Instruction {
  call() {
    return;
  }
}

const HANDLERS: Record<string, any> = {
  ADD: Add,
  MULTIPLY: Multiply,
  INPUT: Input,
  OUTPUT: Output,
  JUMP_IF_TRUE: JumpIfTrue,
  JUMP_IF_FALSE: JumpIfFalse,
  LESS_THAN: LessThan,
  EQUALS: Equals,
  HALT: Halt
};

function createInstruction(memory: number[], pointer: number) {
  const encoded = memory[pointer];
  let opcode = String(encoded).slice(-2);
  if (opcode.length === 1) {
    opcode = `0${opcode}`;
  }
  const handler = operation[opcode];
  const numberParams = NUM_PARAMS[handler];
  const params = memory.slice(
    pointer + 1,
    pointer + numberParams + 1
    );
    const modes = getModes(encoded, numberParams);
  return new HANDLERS[handler](opcode, numberParams + 1, params, modes, memory);
}

function getModes(n: number, numberParams: number) {
  const digits = `${n}`.split("");
  if(digits.length === 1 || [0,1].includes(numberParams)){
    return [0,0,0]
  }
  const lastTwo = digits.splice(digits.length - 2)
  return [...Array(numberParams - lastTwo.length).fill(0),...digits.map(v => Number(v))].reverse()
  
}

function execute() {
  const dataInMemory = fs
    .readFileSync(inputPath, "utf8")
    .split(",")
    .map((v: string) => Number(v));
  
  let pointer = 0;
  
  while (true) {
    const instruction = createInstruction(dataInMemory, pointer);
    const HALT = "99";
    if(instruction.opcode === HALT){
      return
    }
    const jump = instruction.call()
    if(jump){
     pointer = jump; 
    }else{
      pointer += instruction.length
    }
  }
}
execute();
