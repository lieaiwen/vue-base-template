export const ThanZero = (rule,value,callback)=> {
              let reg = 0;
              if (value<=reg) {
                callback(new Error('必须大于零'))
              } else {
                callback()
              }
          }
//必须是正整数
export const isPositiveInt = (rule,value,callback) => {
                  if (!(/(^[1-9]\d*$)/.test(value) || value == null || value == "")){
                    callback(new Error('必须是正整数'))
                  } else {
                    callback()
                  }
              }

