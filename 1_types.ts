
// 타입스크립트의 가장 중요한 포인트는 타입체커와 소통하는것

// const나 let 같은 변수에 타입을 적용하는 방법 
// 변수 뒤에 : 붙이고 타입적기
let a: number = 1;
let b: string = '1';
let c: boolean = true;

let d: number[] = [1, 2];
let e: string[] = ['1', '2'];
let f: boolean[] = [true];

// 늘 타입을 적을 필요는 없다, TS로 하여금 추론하게 하는 것이 좋음
let g = [1, 2];


// === optional 타입 ===
// player 란 객체가 있다.
// const player ={
//     name:"lena"
// }
// player의 요소는 name과 age가 있는데 age는 있을 수도/없을 수도 있다면 이를 어떻게 표현하는가?
// player를 오브젝트로 타입 설정시에 player에 name property가 없다고 나옴
// 왜? object는 name 이라는 요소가 없기 때문 ?? 
// const player: object = {
//    name: 'lena',
// };
// player_.name
// 따라서 다음과 같이 표현
// object란 단어보다 {}를 활용함
// const player : {name:string,age?:number} = {name:"lena"}
// player 는 { 오브젝트 } 타입이고, 그 오브젝트엔 name과 age라는 프로퍼티가 있다.
// age는 ? optional 이기때문에 없어도 됨.
const player: {
   name: string;
   age?: number;
} = {
   name: 'lena',
};
// age는 number|undefined 일수 있는 optional property 이기 때문에
// 다음과 같이 조건문을 쓰면 에러가 남
// if(player.age <10){}
// player.age가 undefined이 아닌 경우를 함께 조건에 넣어야 함.
// age가 있고 age가 10보다 작을 때에...
if (player.age && player.age < 10) {}


// === Alias (별칭) 타입 ===
// 타입 별칭을 정의하는 방법은 type 뒤에 별칭을 입력하고 = 연산자 뒤에 타입을 정의하면 된다.
// type 별칭 = 타입;
// 별칭은 관습적으로 대문자로 시작
// 똑같은 타입을 가지는 객체를 여러개 만들 경우에도 타입으로 만들어 두고 타입으로써 사용하면 편함.
// class 나 method 개념과 비슷
type Name = string;
type Player = {
   name: Name;
   age?: number;
};
const lena: Player = {
   name: 'Lena',
};
const Kay: Player = {
   name: 'Kay',
   age: 12,
};


// === 함수에 타입을 적용하는 방법 ===
// 함수 안에서 player 오브젝트 만든 후 return 할 것임
// playerMaker의 리턴 타입이 Player라고 선언해주면
// 함수에 age property가 없어도 Player 타입에 있기 때문에
// age 요소의 값을 변경할 수 있음.
// function playerMaker(name:string) : Player{
//     return {
//         //name:name
//         name
//     }
// }
// 이를 arrow 함수로 바꿔주면 아래와 같음
// 여기서 마지막 리턴값이 ({}) 이렇게 표현된 이유
// (parameter) => {} returns nothing
// (parameter:string):Player => ({}) return an object
const playerMaker = (name: string): Player => ({ name });
const nico = playerMaker('nico');
nico.age = 12;

// === readonly type ===
// ts 에서만 작동하고 js 엔 반영이 안되고 작동안됨
// 따라서 ts에선 immutable하지만 js 에선 얼마든지 mutable함
const numbers: readonly number[] = [1, 2, 3, 4];
//numbers.push(1) //수정불가능

// === Tuple: 정해진 갯수만큼의 요소를 가진 배열, 특정위치에 특정타입 지정 ===
// ts에만 있고 js엔 없음
// 이런 보호장치는 코드저장하고 실제 production 환경으로 push하기 전에 오류 확인할 수 있어서 좋음
const player1: [string, number, boolean] = ['lena', 12, false];
//player1[0] =1 // 첫번째 요소는 string이어서 number 넣으려고 하면 오류

let x: undefined = undefined;
let y: null = null;

// === any type ===
// 보통 사용하길 권장하지 않는다
// 모든 타입을 수용하기 때문에 ts 타입체크가 되지 않으므로
let h = []; //아무 값이 없을 때는 기본적으로 any타입
const j: any[] = [1, 2, 3, 4];
const k: any = true;
j + k;

// === unknown type ===
// api 로 부터 정보를 받는데 그 정보의 타입을 모를때 unknown 을 쓸 수 있음
let l: unknown;
// unknown 이라 아래 수식이 허용되지 않음
// let m = l + 1;
// 먼저 타입체크 먼저
if (typeof l === 'number') {
   let m = l + 1;
}
if (typeof l === 'string') {
   let m = l.toUpperCase();
}

// === void type ===
// 아무것도 return 하지 않는 함수를 대상으로 사용
function hello1() {
   console.log('x');
}

// === never type ===
// 함수에서 exception(예외)발생시 사용
function hello2(): never {
   //return 'x'
   throw new Error('x');
}

// 아래 함수에서 각각의 조건식에서 반환하는 name의 타입은
// 처음 두개의 조건식에서 parameter로 받는 type의 조건을 다 썼기 때문에
// 나머지는 never일 수 밖에 없음
// 각각 string, number, never이다.
// | and & are only for types.
// || and && are for `if/else` and the like on JS.
function neverCheker(name: string | number) {
   if (typeof name === 'string') {
      name;
   } else if (typeof name === 'number') {
      name;
   } else {
      name;
   }
}

