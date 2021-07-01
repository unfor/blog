import 'dart:math';

/**
 * dart生成N位随机数
 */
String _randomBit(int len) {
  String scopeF = '123456789'; //首位
  String scopeC = '0123456789'; //中间
  String result = '';
  for (int i = 0; i < len; i++) {
    if (i == 0) {
      result = scopeF[Random().nextInt(scopeF.length)];
    } else {
      result = result + scopeC[Random().nextInt(scopeC.length)];
    }
  }
  return result;
}
