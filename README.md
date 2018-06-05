> ### 用途
```
最小代价去突变一个JS对象，而不只是改变它的某个属性。
```
> ### 用法
```javascript
import mutation from 'object-mutation'
// 某个需要突变的复杂js对象
let objx = {
  count: 1,
  a: {
    b: {
      c: {
        d: {
          e: [
            {
              name: '阿黄',
              age: 4
            },
            {
              name: '小强',
              age: 2
            },
            [
              {
                car: 'qq',
                num: '787878'
              }
            ]
          ],
          w: 1991
        },
        x: {
          y: 3
        }
      },
      k: {
        j: 2
      }
    }
  },
  m: {
    n: 1
  }
}

mutation(objx).a.b.c.d.e[0].age = 99
// objx 已经被突变
```
> ### 注意
只能修改，不能读取。例如下面的都会报错。
```javascript
// 报错，因为不能读操作
console.log(mutation(objx).a.b.c.d.e[0].age)
// 报错， 有一次读操作
mutation(objx).a.b.c.d.e[0].age = mutation(objx).a.b.c.d.e[0].age + 1
// 报错，++ 也会有一次读取
mutation(objx).a.b.c.d.e[0].age ++
```
需要读取时，可以在源对象上读取，比如上面的报错例子2可以改为：
```javascript
mutation(objx).a.b.c.d.e[0].age = objx.a.b.c.d.e[0].age + 1
```
