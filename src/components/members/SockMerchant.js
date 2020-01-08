var arr=[10,20,20,10,10,30,50,10,20]
var count=0

arr2=arr.sort()

console.log(arr2)

for(var i; i<arr2.length;i++){
  console.log(i)

  if(arr2[i]==arr2[i+1]){
    count++
    arr2.shift()
    arr2.shift()
  } else {
    arr2.shift()
  }
}

console.log(count)