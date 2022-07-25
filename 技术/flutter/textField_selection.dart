import 'package:flutter/material.dart';

/**
 * Flutter TextField输入框光标位置问题
 * TextField有默认文字时，光标没有位于最后的位置
 */
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // showPerformanceOverlay: true,
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
        // This makes the visual density adapt to the platform that you run
        // the app on. For desktop platforms, the controls will be smaller and
        // closer together (more dense) than on mobile platforms.
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
      localeResolutionCallback: (locale, supportedLocales) {
        if (locale != null) {
          languageCode = locale.languageCode;
        }
        return null;
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  void initState() {
    super.initState();
    plasoUI.init(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: ListView(
        children: [
          Container(
            child: Expanded(
              child: CupertinoTextField(
                controller:

                    // ##################begin
                    TextEditingController.fromValue(
                  TextEditingValue(
                    text: defaultText,
                    // 保持光标在最后
                    selection: TextSelection.fromPosition(
                      TextPosition(affinity: TextAffinity.downstream, offset: defaultText.length),
                    ),
                  ),
                ),
                // #####################end

                decoration: BoxDecoration(
                  color: Colors.grey.shade50,
                  border: Border.all(color: Colors.grey, width: 0.3),
                  borderRadius: BorderRadius.all(
                    Radius.circular(5),
                  ),
                ),
                onChanged: (text) {
                  newGroupName = text;
                },
                autofocus: true,
                cursorColor: Colors.green,
              ),
            ),
          )
        ],
      ),
    );
  }
}
