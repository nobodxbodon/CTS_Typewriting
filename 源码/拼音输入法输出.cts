/// <引用 路径="../node_modules/@types/支持库/index.d.cts"/>
导入 { 系统 } 来自 "./系统";
导入 { 创建对象, 按系数升序, 分行读文件, 库内词, 拼音评估结果, 拼音验证结果 } 来自 "./工具";
导入 { 编译拼音, 重组拼音, 拼音, 取拼音组拼音, 取全拼索引, 中间有分割符, 取拼音索引简拼, 拼音是相等的, PY标记, 是三拼韵母组, Py } 来自 "./编译拼音";
导入 { 查询拼音数据库 } 来自 "./数据读取";
导入 { 是数组 } 来自 "./核心";

变量 汉字拼音对应表: 文字[];
变量 拼音汉字对应表: 映射类<文字, 文字>;

变量 全部拼音组合 = 新建 集合类(["a", "ai", "an", "ang", "ao", "b", "ba", "bai", "ban", "bang", "bao", "bei", "ben", "beng", "bi", "bian", "biao", "bie", "bin", "bing", "bo", "bu", "c", "ca", "cai", "can", "cang", "cao", "ce", "cen", "ceng", "ch", "cha", "chai", "chan", "chang", "chao", "che", "chen", "cheng", "chi", "chong", "chou", "chu", "chuai", "chuan", "chuang", "chui", "chun", "chuo", "ci", "cong", "cou", "cu", "cuan", "cui", "cun", "cuo", "d", "da", "dai", "dan", "dang", "dao", "de", "dei", "deng", "di", "dia", "dian", "diao", "die", "ding", "diu", "dong", "dou", "du", "duan", "dui", "dun", "duo", "e", "ei", "en", "er", "f", "fa", "fan", "fang", "fei", "fen", "feng", "fo", "fou", "fu", "g", "ga", "gai", "gan", "gang", "gao", "ge", "gei", "gen", "geng", "gong", "gou", "gu", "gua", "guai", "guan", "guang", "gui", "gun", "guo", "h", "ha", "hai", "han", "hang", "hao", "he", "hei", "hen", "heng", "hong", "hou", "hu", "hua", "huai", "huan", "huang", "hui", "hun", "huo", "j", "ji", "jia", "jian", "jiang", "jiao", "jie", "jin", "jing", "jiong", "jiu", "ju", "juan", "jue", "jun", "k", "ka", "kai", "kan", "kang", "kao", "ke", "ken", "keng", "kong", "kou", "ku", "kua", "kuai", "kuan", "kuang", "kui", "kun", "kuo", "l", "la", "lai", "lan", "lang", "lao", "le", "lei", "leng", "li", "lia", "lian", "liang", "liao", "lie", "lin", "ling", "liu", "long", "lou", "lu", "luan", "lun", "luo", "lv", "lve", "m", "ma", "mai", "man", "mang", "mao", "me", "mei", "men", "meng", "mi", "mian", "miao", "mie", "min", "ming",
    "miu", "mo", "mou", "mu", "n", "na", "nai", "nan", "nang", "nao", "ne", "nei", "nen", "neng", "ni", "nian", "niang", "niao", "nie", "nin", "ning", "niu", "nong", "nou", "nu", "nuan", "nuo", "nv", "nve", "o", "ou", "p", "pa", "pai", "pan", "pang", "pao", "pei", "pen", "peng", "pi", "pian", "piao", "pie", "pin", "ping", "po", "pou", "pu", "q", "qi", "qia", "qian", "qiang", "qiao", "qie", "qin", "qing", "qiong", "qiu", "qu", "quan", "que", "qun", "r", "ran", "rang", "rao", "re", "ren", "reng", "ri", "rong", "rou", "ru", "ruan", "rui", "run", "ruo", "s", "sa", "sai", "san", "sang", "sao", "se", "sen", "seng", "sh", "sha", "shai", "shan", "shang", "shao", "she", "shen", "sheng", "shi", "shou", "shu", "shua", "shuai", "shuan", "shuang", "shui", "shun", "shuo", "si", "song", "sou", "su", "suan", "sui", "sun", "suo", "t", "ta", "tai", "tan", "tang", "tao", "te", "teng", "ti", "tian", "tiao", "tie", "ting", "tong", "tou", "tu", "tuan", "tui", "tun", "tuo", "w", "wa", "wai", "wan", "wang", "wei", "wen", "weng", "wo", "wu", "x", "xi", "xia", "xian", "xiang", "xiao", "xie", "xin", "xing", "xiong", "xiu", "xu", "xuan", "xue", "xun", "y", "ya", "yan", "yang", "yao", "ye", "yi", "yin", "ying", "yo", "yong", "you", "yu", "yuan", "yue", "yun", "z", "za", "zai", "zan", "zang", "zao", "ze", "zei", "zen", "zeng", "zh", "zha", "zhai", "zhan", "zhang", "zhao", "zhe", "zhei", "zhen", "zheng", "zhi", "zhong", "zhou", "zhu", "zhua", "zhuai", "zhuan", "zhuang", "zhui", "zhun", "zhuo", "zi", "zong", "zou", "zu", "zuan",
    "zui", "zun", "zuo"]);

函数 评估拼音(pyz: 拼音[]): 拼音评估结果 {
    变量 可以重组 = 为假;
    变量 必须重组 = 为假;
    变量 包含简拼 = 为假;
    变量 全为简拼 = 为假;
    变量 全为全拼 = 为假;
    变量 简拼输入: 数字[] = [];
    循环 (变量 i = 0; i < pyz.长度; i++) {
        变量 p = pyz[i];
        如果 (是简拼拼音(p)) {
            简拼输入.压入(i);
        }
        如果 (!p.声母 && i !== 0 && !中间有分割符(p, pyz[i - 1])) {
            可以重组 = 为真;
        }
        如果 (!全部拼音组合.存在(p.文本)) {
            必须重组 = 为真;
        }
    }
    返回 { 可以重组, 必须重组, 包含简拼: !!简拼输入.长度, 全为简拼: 简拼输入.长度 === pyz.长度, 全为全拼: !简拼输入.长度 };
}

函数 是简拼拼音(p: 拼音) {
    如果 (p.声母 && p.韵母) {
        返回 为假;
    }
    如果 (!p.声母) {
        如果 (是三拼韵母组(p.韵母)) {
            返回 为真;
        }
        如果 (p.韵母.标记 === PY标记.韵母_a || p.韵母.标记 === PY标记.韵母_o || p.韵母.标记 === PY标记.韵母_e) {
            返回 为假;
        }
    }
    返回 为真;
}

函数 验证拼音(py: 拼音[]): 拼音验证结果 {
    变量 py1: 拼音[];
    变量 py2: 拼音[];
    变量 { 可以重组, 必须重组, 包含简拼, 全为简拼, 全为全拼 } = 评估拼音(py);
    如果 (必须重组) {
        py1 = 重组拼音(py);
        如果 (py1 === py) {
            变量 ls: 拼音[] = [];
            循环 (变量 i = 0; i < py.长度; i++) {
                变量 p = py[i];
                变量 重组后评估结果 = 评估拼音([p]);
                如果 (!重组后评估结果.必须重组) {
                    包含简拼 = 重组后评估结果.包含简拼;
                    全为简拼 = 重组后评估结果.全为简拼;
                    全为全拼 = 重组后评估结果.全为全拼;
                    ls.压入(p);
                }
                否则 {
                    跳出;
                }
            }
            如果 (ls && ls.长度) {
                py = ls;
                py1 = 未定;
            }
        }
        否则 {
            变量 重组后评估结果 = 评估拼音(py1);
            如果 (重组后评估结果.必须重组) {
                返回;
            }
            否则 {
                包含简拼 = 重组后评估结果.包含简拼;
                全为简拼 = 重组后评估结果.全为简拼;
                全为全拼 = 重组后评估结果.全为全拼;
            }
        }
    }
    如果 (可以重组) {
        py2 = 重组拼音(py);
        变量 重组后评估结果 = 评估拼音(py2);
        如果 (重组后评估结果.必须重组) {
            py2 = 未定;
        }
        否则 {
            包含简拼 = 重组后评估结果.包含简拼;
            全为简拼 = 重组后评估结果.全为简拼;
            全为全拼 = 重组后评估结果.全为全拼;
        }
    }
    如果 (!py1) {
        py1 = py;
    }
    如果 (拼音是相等的(py1, py2)) {
        py2 = 未定;
    }
    返回 { py1, py2, 包含简拼, 全为简拼, 全为全拼 };
}

导出 函数 取汉字拼音(文本: 文字, 分割符 = "'", 忽略不存在: 真假 = 为假) {
    变量 拼音组: 文字[] = [];
    循环 (变量 i = 0; i < 文本.长度; i++) {
        变量 拼音 = 取汉字拼音对应表()[文本.字符代码在(i)];
        如果 (!拼音) {
            如果 (忽略不存在) {
                拼音 = 文本[i];
            }
            否则 {
                抛出 新建 错误类("包含无拼音文字");
            }
        }
        如果 (拼音.索引在("'") !== -1) {
            拼音 = 拼音.分割("'")[0];
        }
        拼音组.压入(拼音);
    }
    返回 拼音组.连接(分割符);
}

导出 函数 取汉字拼音对应表() {
    函数 生成汉字拼音对应表() {
        汉字拼音对应表 = [];
        常量 汉字拼音对应表路径 = 系统.解析路径("../lib/汉字拼音对应词典.utf8");
        变量 汉字拼音对应内容 = 系统.读文件(汉字拼音对应表路径) 转为 文字;
        变量 汉字拼音对应组 = 汉字拼音对应内容.分割(";");
        汉字拼音对应组.循环执行(v => {
            常量 z = v.分割(":");
            常量 hz = z[0];
            常量 py = z[1];
            汉字拼音对应表[hz.字符代码在(0)] = py;
        });
        返回 汉字拼音对应表;
    }
    如果 (汉字拼音对应表) {
        返回 汉字拼音对应表;
    }
    否则 {
        返回 生成汉字拼音对应表();
    }
}

导出 函数 取拼音汉字对应表() {
    函数 生成拼音汉字对应表() {
        拼音汉字对应表 = 新建 映射类();
        常量 拼音汉字对应表路径 = 系统.解析路径("../lib/拼音汉字对应词典.utf8");
        变量 内容 = 系统.读文件(拼音汉字对应表路径) 转为 文字;
        变量 读一行 = 分行读文件(内容, "\n");
        判断 (为真) {
            变量 一行 = 读一行.下个().值;
            如果 (!一行) {
                跳出;
            }
            否则 {
                变量 分割 = 一行.分割(":");
                拼音汉字对应表.设置(分割[0], 分割[1]);
            }
        }
        返回 拼音汉字对应表;
    }
    返回 拼音汉字对应表 || 生成拼音汉字对应表();
}
导出 函数 编译拼音组(py: 文字): 拼音验证结果 {
    变量 PY = 编译拼音(py);
    如果 (!PY) {
        返回;
    }
    返回 验证拼音(PY);
}
变量 上次结果: 库内词[];

导出 函数 拼音查词(py: 文字): 库内词[] {

    变量 命令字符: 文字 = "";
    变量 原始命令: 文字[] = [];
    变量 加号数量 = 0;
    变量 减号数量 = 0;

    循环 (变量 i = py.长度 - 1; i !== 0; i--) {
        如果 (py[i] === "+") {
            原始命令.推入("+");
            加号数量++;
        }
        否则 如果 (py[i] === "-") {
            原始命令.推入("-");
            减号数量++;
        }
        否则 {
            如果 (i !== py.长度) {
                py = py.子文字(0, ++i);
                跳出;
            }
            跳出;
        }
    }

    变量 开始 = -1;

    如果 (加号数量 === 减号数量 && 加号数量 !== 0) {
        开始 = 0;
    }
    否则 如果 (加号数量 < 减号数量) {
        开始 = 0;
    }
    否则 如果 (加号数量 > 减号数量) {
        开始 = 0;
        循环 (变量 i = 0; i < 加号数量 - 减号数量; i++) {
            命令字符 += "+";
        }
    }

    如果 (开始 !== -1 && 上次结果) {
        变量 开始 = 命令字符.长度 * 5;

        如果 (上次结果.长度 < 开始) {
            如果 (上次结果.长度 > 5) {
                开始 = 上次结果.长度 - 5;
            }
            否则 {
                开始 = 0;
            }
        }

        变量 长度1 = 上次结果.长度 - 开始 > 5 ? 5 : 上次结果.长度;
        变量 返回的 = 长度1 ? 上次结果.分裂(开始, 开始 + 长度1) : 未定;
        变量 值: 库内词[] = [];

        如果 (返回的) {
            返回的.循环执行(v => {
                v.剩余输入 = 原始命令.连接("");
                值.压入(v);
            });
        }

        返回 值;
    }

    如果 (!py) {
        返回 [{ 拼音: "", 文本: "", 频率: 1 }];
    }

    变量 拼音 = 编译拼音(py);

    如果 (!拼音) {
        返回 [{ 拼音: py.替换("'", ""), 文本: py, 频率: 1 }];
    }

    变量 验证 = 验证拼音(拼音);

    如果 (验证) {
        变量 结果1: 库内词[], 结果2: 库内词[];
        变量 词组: 库内词[] = [];
        如果 (验证.py1) {
            结果1 = 数据库内查找(生成数据库查询键(验证.py1, 验证.全为简拼), 验证.全为全拼, 验证.全为简拼);
            如果 (结果1) {
                词组.压入(...结果1);
            }
        }
        如果 (验证.py2) {
            结果2 = 数据库内查找(生成数据库查询键(验证.py2, 验证.全为简拼), 验证.全为全拼, 验证.全为简拼);
            如果 (结果2) {
                词组.压入(...结果2);
            }
        }
        如果 (词组.长度 > 1) {
            上次结果 = 词组;
        }
        变量 长度 = 词组.长度 > 5 ? 5 : 未定;
        返回 长度 ? 词组.分裂(0, 长度) : 词组 ? 词组 : [{ 拼音: py.替换("'", ""), 文本: py, 频率: 0 }];
    }

    返回 [{ 拼音: py, 文本: py, 频率: 0 }];

    函数 数据库内查找(pysy: {
            键: 文字[];
            拼音: 文字;
        }, 为全拼: 真假, 为简拼: 真假) {
            
        返回 查询拼音数据库(pysy.键, pysy.拼音, 为全拼, 为简拼);
    }

}

函数 生成数据库查询键(拼音组: 拼音[], 全为简拼: 真假) {
    如果 (全为简拼) {
        变量 键组 = 拼音组.映射(p => p.文本);
        返回 { 键: 键组, 拼音: 键组.连接("'") };
    }
    变量 键组: 文字[] = [];
    循环 (变量 i = 0; i < 拼音组.长度; i++) {
        变量 键 = 拼音组[i].声母 && 拼音组[i].声母.文本 || 取拼音索引简拼(拼音组[i].文本);
        键组.压入(键);
    }
    如果 (键组.长度) {
        返回 { 键: 键组, 拼音: 拼音组.映射(v => v.文本).连接("'") };
    }
}
