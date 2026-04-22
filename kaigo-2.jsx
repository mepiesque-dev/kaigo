import { useState, useEffect, useCallback } from "react";

const ALL_VOCAB = [
  // BAGIAN TUBUH
  { kanji: "頭", reading: "atama", arti: "kepala", kategori: "Bagian Tubuh" },
  { kanji: "額", reading: "hitai", arti: "dahi", kategori: "Bagian Tubuh" },
  { kanji: "目", reading: "me", arti: "mata", kategori: "Bagian Tubuh" },
  { kanji: "目頭", reading: "megashira", arti: "sudut bagian dalam mata", kategori: "Bagian Tubuh" },
  { kanji: "目尻", reading: "mejiri", arti: "sudut bagian luar mata", kategori: "Bagian Tubuh" },
  { kanji: "耳", reading: "mimi", arti: "telinga", kategori: "Bagian Tubuh" },
  { kanji: "鼻", reading: "hana", arti: "hidung", kategori: "Bagian Tubuh" },
  { kanji: "口", reading: "kuchi", arti: "mulut", kategori: "Bagian Tubuh" },
  { kanji: "唇", reading: "kuchibiru", arti: "bibir", kategori: "Bagian Tubuh" },
  { kanji: "顎", reading: "ago", arti: "dagu", kategori: "Bagian Tubuh" },
  { kanji: "首", reading: "kubi", arti: "leher", kategori: "Bagian Tubuh" },
  { kanji: "喉", reading: "nodo", arti: "tenggorokan", kategori: "Bagian Tubuh" },
  { kanji: "脇", reading: "waki", arti: "ketiak", kategori: "Bagian Tubuh" },
  { kanji: "腕", reading: "ude", arti: "lengan", kategori: "Bagian Tubuh" },
  { kanji: "肘", reading: "hiji", arti: "siku", kategori: "Bagian Tubuh" },
  { kanji: "腰", reading: "koshi", arti: "pinggang", kategori: "Bagian Tubuh" },
  { kanji: "手首", reading: "tekubi", arti: "pergelangan tangan", kategori: "Bagian Tubuh" },
  { kanji: "手のひら", reading: "te no hira", arti: "telapak tangan", kategori: "Bagian Tubuh" },
  { kanji: "指", reading: "yubi", arti: "jari", kategori: "Bagian Tubuh" },
  { kanji: "指先", reading: "yubisaki", arti: "ujung jari", kategori: "Bagian Tubuh" },
  { kanji: "手の甲", reading: "te no kou", arti: "punggung tangan", kategori: "Bagian Tubuh" },
  { kanji: "足首", reading: "ashikubi", arti: "pergelangan kaki", kategori: "Bagian Tubuh" },
  { kanji: "つま先", reading: "tsumasaki", arti: "ujung jari kaki", kategori: "Bagian Tubuh" },
  { kanji: "肩", reading: "kata", arti: "bahu", kategori: "Bagian Tubuh" },
  { kanji: "背中", reading: "senaka", arti: "punggung", kategori: "Bagian Tubuh" },
  { kanji: "胸", reading: "mune", arti: "dada", kategori: "Bagian Tubuh" },
  { kanji: "臀部／尻", reading: "denbu / shiri", arti: "pantat", kategori: "Bagian Tubuh" },
  { kanji: "腹", reading: "hara", arti: "perut", kategori: "Bagian Tubuh" },
  { kanji: "膝", reading: "hiza", arti: "lutut", kategori: "Bagian Tubuh" },
  { kanji: "踵", reading: "kakato", arti: "tumit", kategori: "Bagian Tubuh" },
  { kanji: "足底／足の裏", reading: "sokutei / ashi no ura", arti: "telapak kaki", kategori: "Bagian Tubuh" },
  { kanji: "顔色", reading: "kaoiro", arti: "air muka", kategori: "Bagian Tubuh" },
  { kanji: "患側", reading: "kansoku", arti: "sisi sakit", kategori: "Bagian Tubuh" },
  { kanji: "健側", reading: "kensoku", arti: "sisi sehat", kategori: "Bagian Tubuh" },
  { kanji: "健康", reading: "kenkou", arti: "kesehatan", kategori: "Bagian Tubuh" },
  { kanji: "体調", reading: "taichou", arti: "kondisi fisik", kategori: "Bagian Tubuh" },
  { kanji: "バイタルサイン", reading: "baitaru sain", arti: "tanda-tanda vital", kategori: "Bagian Tubuh" },
  // MAKANAN
  { kanji: "あげもの", reading: "agemono", arti: "gorengan", kategori: "Makanan & Minuman" },
  { kanji: "いためもの", reading: "itamemono", arti: "tumis", kategori: "Makanan & Minuman" },
  { kanji: "おやつ", reading: "oyatsu", arti: "camilan", kategori: "Makanan & Minuman" },
  { kanji: "粥／お粥", reading: "kayu / okayu", arti: "bubur", kategori: "Makanan & Minuman" },
  { kanji: "カレーライス", reading: "karee raisu", arti: "nasi kari", kategori: "Makanan & Minuman" },
  { kanji: "献立", reading: "kondate", arti: "daftar makanan", kategori: "Makanan & Minuman" },
  { kanji: "献立表", reading: "kondate hyou", arti: "tabel daftar makanan", kategori: "Makanan & Minuman" },
  { kanji: "主食", reading: "shushoku", arti: "makanan pokok", kategori: "Makanan & Minuman" },
  { kanji: "汁物", reading: "shirumono", arti: "sup", kategori: "Makanan & Minuman" },
  { kanji: "ゼリー", reading: "zerii", arti: "jeli", kategori: "Makanan & Minuman" },
  { kanji: "たまご焼き", reading: "tamagoyaki", arti: "telur goreng", kategori: "Makanan & Minuman" },
  { kanji: "漬物", reading: "tsukemono", arti: "acar", kategori: "Makanan & Minuman" },
  { kanji: "天ぷら", reading: "tenpura", arti: "tempura", kategori: "Makanan & Minuman" },
  { kanji: "豆腐", reading: "toufu", arti: "tahu", kategori: "Makanan & Minuman" },
  { kanji: "丼", reading: "donburi", arti: "mangkuk", kategori: "Makanan & Minuman" },
  { kanji: "煮付け", reading: "nitsuke", arti: "rebus berbumbu / semur", kategori: "Makanan & Minuman" },
  { kanji: "煮物", reading: "nimono", arti: "rebusan", kategori: "Makanan & Minuman" },
  { kanji: "ハンバーグ", reading: "hanbaagu", arti: "daging hamburger", kategori: "Makanan & Minuman" },
  { kanji: "副食", reading: "fukushoku", arti: "lauk", kategori: "Makanan & Minuman" },
  { kanji: "プリン", reading: "purin", arti: "puding", kategori: "Makanan & Minuman" },
  { kanji: "麦茶", reading: "mugicha", arti: "teh gandum", kategori: "Makanan & Minuman" },
  { kanji: "メニュー", reading: "menyuu", arti: "menu", kategori: "Makanan & Minuman" },
  { kanji: "焼き魚", reading: "yakizakana", arti: "ikan bakar", kategori: "Makanan & Minuman" },
  { kanji: "ヨーグルト", reading: "yooguruto", arti: "yoghurt", kategori: "Makanan & Minuman" },
  // PERAWATAN MAKAN
  { kanji: "温める", reading: "atatameru", arti: "menghangatkan", kategori: "Perawatan Makan" },
  { kanji: "エプロン", reading: "epuron", arti: "celemek", kategori: "Perawatan Makan" },
  { kanji: "嚥下", reading: "enge", arti: "menelan", kategori: "Perawatan Makan" },
  { kanji: "きざむ", reading: "kizamu", arti: "memotong", kategori: "Perawatan Makan" },
  { kanji: "誤嚥", reading: "goen", arti: "tersedak paru (aspirasi)", kategori: "Perawatan Makan" },
  { kanji: "こぼす", reading: "kobosu", arti: "menumpahkan", kategori: "Perawatan Makan" },
  { kanji: "食器を下げる", reading: "sageru", arti: "membereskan (alat makan)", kategori: "Perawatan Makan" },
  { kanji: "冷ます", reading: "samasu", arti: "mendinginkan", kategori: "Perawatan Makan" },
  { kanji: "食品", reading: "shokuhin", arti: "makanan", kategori: "Perawatan Makan" },
  { kanji: "食欲", reading: "shokuyoku", arti: "nafsu makan", kategori: "Perawatan Makan" },
  { kanji: "水分補給", reading: "suibun hokyuu", arti: "asupan cairan", kategori: "Perawatan Makan" },
  { kanji: "咳込む", reading: "sekikomu", arti: "batuk", kategori: "Perawatan Makan" },
  { kanji: "とろみ粉", reading: "toromi ko", arti: "bubuk pengental", kategori: "Perawatan Makan" },
  { kanji: "とろみをつける", reading: "tsukeru", arti: "mengentalkan", kategori: "Perawatan Makan" },
  { kanji: "飲み込む", reading: "nomikomu", arti: "menelan", kategori: "Perawatan Makan" },
  { kanji: "一口大", reading: "hitokuchidai", arti: "ukuran satu gigitan", kategori: "Perawatan Makan" },
  { kanji: "むせる", reading: "museru", arti: "tersedak", kategori: "Perawatan Makan" },
  { kanji: "量", reading: "ryou", arti: "jumlah", kategori: "Perawatan Makan" },
  // BERPINDAH & POSISI
  { kanji: "移乗", reading: "ijou", arti: "beralih", kategori: "Berpindah & Posisi" },
  { kanji: "移動", reading: "idou", arti: "berpindah", kategori: "Berpindah & Posisi" },
  { kanji: "移動用リフト", reading: "idouyou rifuto", arti: "alat pemindah", kategori: "Berpindah & Posisi" },
  { kanji: "起き上がる", reading: "okiagaru", arti: "bangkit", kategori: "Berpindah & Posisi" },
  { kanji: "ブレーキをかける", reading: "kakeru", arti: "mengerem", kategori: "Berpindah & Posisi" },
  { kanji: "臥床", reading: "gashou", arti: "berbaring", kategori: "Berpindah & Posisi" },
  { kanji: "車いす", reading: "kurumaisu", arti: "kursi roda", kategori: "Berpindah & Posisi" },
  { kanji: "声かけ", reading: "koekake", arti: "sapaan / interaksi", kategori: "Berpindah & Posisi" },
  { kanji: "支える", reading: "sasaeru", arti: "menopang", kategori: "Berpindah & Posisi" },
  { kanji: "シルバーカー", reading: "shirubaakaa", arti: "troli lansia", kategori: "Berpindah & Posisi" },
  { kanji: "すべる", reading: "suberu", arti: "tergelincir", kategori: "Berpindah & Posisi" },
  { kanji: "スライディングシート", reading: "suraidingu shiito", arti: "kursi geser", kategori: "Berpindah & Posisi" },
  { kanji: "杖", reading: "tsue", arti: "tongkat", kategori: "Berpindah & Posisi" },
  { kanji: "杖をつく", reading: "tsuku", arti: "memakai (tongkat)", kategori: "Berpindah & Posisi" },
  { kanji: "つかまる", reading: "tsukamaru", arti: "berpegangan", kategori: "Berpindah & Posisi" },
  { kanji: "手すり", reading: "tesuri", arti: "handrail (pegangan)", kategori: "Berpindah & Posisi" },
  { kanji: "握る", reading: "nigiru", arti: "mencengkeram", kategori: "Berpindah & Posisi" },
  { kanji: "寝返り", reading: "negaeri", arti: "membalik badan", kategori: "Berpindah & Posisi" },
  { kanji: "白杖", reading: "hakujou", arti: "tongkat putih", kategori: "Berpindah & Posisi" },
  { kanji: "ブレーキ", reading: "bureeki", arti: "rem", kategori: "Berpindah & Posisi" },
  { kanji: "歩行器", reading: "hokouki", arti: "alat bantu jalan", kategori: "Berpindah & Posisi" },
  { kanji: "前屈み", reading: "maekagami", arti: "membungkuk", kategori: "Berpindah & Posisi" },
  { kanji: "誘導", reading: "yuudou", arti: "panduan", kategori: "Berpindah & Posisi" },
  { kanji: "離床", reading: "rishou", arti: "beranjak dari tempat tidur", kategori: "Berpindah & Posisi" },
  { kanji: "仰臥位／あおむけ", reading: "gyougai / aomuke", arti: "terlentang", kategori: "Berpindah & Posisi" },
  { kanji: "側臥位／よこむき", reading: "sokugai / yokomuki", arti: "miring", kategori: "Berpindah & Posisi" },
  { kanji: "腹臥位／うつぶせ", reading: "fukugai / utsubuse", arti: "tengkurap", kategori: "Berpindah & Posisi" },
  { kanji: "端座位", reading: "tanzai", arti: "duduk tegak lurus", kategori: "Berpindah & Posisi" },
  { kanji: "椅座位", reading: "izai", arti: "duduk kursi", kategori: "Berpindah & Posisi" },
  { kanji: "立位", reading: "ritsui", arti: "berdiri", kategori: "Berpindah & Posisi" },
  { kanji: "体位変換", reading: "taii henkan", arti: "mengubah posisi", kategori: "Berpindah & Posisi" },
  // PENYAKIT & GEJALA
  { kanji: "疥癬", reading: "kaisen", arti: "skabies", kategori: "Penyakit & Gejala" },
  { kanji: "風邪", reading: "kaze", arti: "masuk angin / flu", kategori: "Penyakit & Gejala" },
  { kanji: "高血圧症", reading: "kouketsuatsushou", arti: "hipertensi", kategori: "Penyakit & Gejala" },
  { kanji: "食中毒", reading: "shokuchuudoku", arti: "keracunan makanan", kategori: "Penyakit & Gejala" },
  { kanji: "認知症", reading: "ninchishou", arti: "demensia", kategori: "Penyakit & Gejala" },
  { kanji: "熱中症", reading: "netchuushou", arti: "heatstroke", kategori: "Penyakit & Gejala" },
  { kanji: "肺炎", reading: "haien", arti: "pneumonia", kategori: "Penyakit & Gejala" },
  { kanji: "白内障", reading: "hakunaishou", arti: "katarak", kategori: "Penyakit & Gejala" },
  { kanji: "アレルギー", reading: "arerugii", arti: "alergi", kategori: "Penyakit & Gejala" },
  { kanji: "痛い", reading: "itai", arti: "sakit / nyeri", kategori: "Penyakit & Gejala" },
  { kanji: "嘔吐", reading: "outo", arti: "muntah", kategori: "Penyakit & Gejala" },
  { kanji: "片麻痺", reading: "katamahi", arti: "lumpuh sebelah", kategori: "Penyakit & Gejala" },
  { kanji: "かゆい", reading: "kayui", arti: "gatal", kategori: "Penyakit & Gejala" },
  { kanji: "傷", reading: "kizu", arti: "luka", kategori: "Penyakit & Gejala" },
  { kanji: "苦しい", reading: "kurushii", arti: "sesak / menderita", kategori: "Penyakit & Gejala" },
  { kanji: "下痢", reading: "geri", arti: "diare", kategori: "Penyakit & Gejala" },
  { kanji: "拘縮", reading: "koushuku", arti: "kaku sendi", kategori: "Penyakit & Gejala" },
  { kanji: "骨折", reading: "kossetsu", arti: "patah tulang", kategori: "Penyakit & Gejala" },
  { kanji: "しびれる", reading: "shibireru", arti: "mati rasa", kategori: "Penyakit & Gejala" },
  { kanji: "出血", reading: "shukketsu", arti: "berdarah", kategori: "Penyakit & Gejala" },
  { kanji: "症状", reading: "shoujou", arti: "gejala", kategori: "Penyakit & Gejala" },
  { kanji: "褥瘡", reading: "jokusou", arti: "luka baring (dekubitus)", kategori: "Penyakit & Gejala" },
  { kanji: "咳", reading: "seki", arti: "batuk", kategori: "Penyakit & Gejala" },
  { kanji: "脱水", reading: "dassui", arti: "dehidrasi", kategori: "Penyakit & Gejala" },
  { kanji: "吐き気", reading: "hakike", arti: "mual", kategori: "Penyakit & Gejala" },
  { kanji: "発熱", reading: "hatsunetsu", arti: "demam", kategori: "Penyakit & Gejala" },
  { kanji: "発汗", reading: "hakkan", arti: "berkeringat", kategori: "Penyakit & Gejala" },
  { kanji: "はれる", reading: "hareru", arti: "bengkak / radang", kategori: "Penyakit & Gejala" },
  { kanji: "便秘", reading: "benpi", arti: "konstipasi", kategori: "Penyakit & Gejala" },
  { kanji: "発作", reading: "hossa", arti: "kejang", kategori: "Penyakit & Gejala" },
  { kanji: "むくむ", reading: "mukumu", arti: "bengkak (edema)", kategori: "Penyakit & Gejala" },
  { kanji: "めまい", reading: "memai", arti: "pusing", kategori: "Penyakit & Gejala" },
  // BUANG AIR
  { kanji: "ズボンを上げる", reading: "ageru", arti: "memakai (celana)", kategori: "Buang Air (Toilet)" },
  { kanji: "足元", reading: "ashimoto", arti: "kaki", kategori: "Buang Air (Toilet)" },
  { kanji: "陰部", reading: "inbu", arti: "area genital", kategori: "Buang Air (Toilet)" },
  { kanji: "おむつ", reading: "omutsu", arti: "popok", kategori: "Buang Air (Toilet)" },
  { kanji: "浣腸", reading: "kanchou", arti: "enema", kategori: "Buang Air (Toilet)" },
  { kanji: "着替える", reading: "kigaeru", arti: "berganti pakaian", kategori: "Buang Air (Toilet)" },
  { kanji: "ズボンを下げる", reading: "sageru", arti: "menurunkan celana", kategori: "Buang Air (Toilet)" },
  { kanji: "失禁", reading: "shikkin", arti: "inkontinensia", kategori: "Buang Air (Toilet)" },
  { kanji: "羞恥心", reading: "shuuchishin", arti: "rasa malu", kategori: "Buang Air (Toilet)" },
  { kanji: "使い捨て手袋", reading: "tsukaisute tebukuro", arti: "sarung tangan sekali pakai", kategori: "Buang Air (Toilet)" },
  { kanji: "尿", reading: "nyou", arti: "urine", kategori: "Buang Air (Toilet)" },
  { kanji: "尿器", reading: "nyouki", arti: "perkemihan (wadah urine)", kategori: "Buang Air (Toilet)" },
  { kanji: "尿意", reading: "nyoui", arti: "keinginan berkemih", kategori: "Buang Air (Toilet)" },
  { kanji: "排泄", reading: "haisetsu", arti: "ekskresi", kategori: "Buang Air (Toilet)" },
  { kanji: "便", reading: "ben", arti: "feses", kategori: "Buang Air (Toilet)" },
  { kanji: "便意", reading: "ben-i", arti: "keinginan defekasi", kategori: "Buang Air (Toilet)" },
  { kanji: "便座", reading: "benza", arti: "toilet duduk", kategori: "Buang Air (Toilet)" },
  { kanji: "ポータブルトイレ", reading: "pootaburu toire", arti: "toilet portabel", kategori: "Buang Air (Toilet)" },
  // KEBERSIHAN DIRI
  { kanji: "衣類", reading: "irui", arti: "pakaian", kategori: "Kebersihan Diri" },
  { kanji: "入れ歯／義歯", reading: "ireba / gishi", arti: "gigi tiruan / palsu", kategori: "Kebersihan Diri" },
  { kanji: "うがい", reading: "ugai", arti: "berkumur", kategori: "Kebersihan Diri" },
  { kanji: "上着", reading: "uwagi", arti: "baju atasan", kategori: "Kebersihan Diri" },
  { kanji: "起床", reading: "kishou", arti: "bangun tidur", kategori: "Kebersihan Diri" },
  { kanji: "くし", reading: "kushi", arti: "sisir", kategori: "Kebersihan Diri" },
  { kanji: "更衣", reading: "koui", arti: "berganti pakaian", kategori: "Kebersihan Diri" },
  { kanji: "口腔ケア", reading: "koukuu kea", arti: "perawatan rongga mulut", kategori: "Kebersihan Diri" },
  { kanji: "下着", reading: "shitagi", arti: "pakaian dalam", kategori: "Kebersihan Diri" },
  { kanji: "スカート", reading: "sukaato", arti: "rok", kategori: "Kebersihan Diri" },
  { kanji: "爪きり", reading: "tsumekiri", arti: "gunting kuku", kategori: "Kebersihan Diri" },
  { kanji: "髪をとかす", reading: "tokasu", arti: "menyisir (rambut)", kategori: "Kebersihan Diri" },
  { kanji: "ドライヤー", reading: "doraiyaa", arti: "pengering rambut", kategori: "Kebersihan Diri" },
  { kanji: "ねまき", reading: "nemaki", arti: "pakaian tidur", kategori: "Kebersihan Diri" },
  { kanji: "歯ブラシ", reading: "haburashi", arti: "sikat gigi", kategori: "Kebersihan Diri" },
  { kanji: "歯磨き", reading: "hamigaki", arti: "pasta gigi", kategori: "Kebersihan Diri" },
  { kanji: "パンツ", reading: "pantsu", arti: "celana dalam", kategori: "Kebersihan Diri" },
  { kanji: "ひげ剃り", reading: "higesori", arti: "pisau cukur", kategori: "Kebersihan Diri" },
  { kanji: "みじたく", reading: "mijitaku", arti: "merapikan diri", kategori: "Kebersihan Diri" },
  { kanji: "口をゆすぐ", reading: "yusugu", arti: "membilas (mulut)", kategori: "Kebersihan Diri" },
  // MANDI
  { kanji: "温度", reading: "ondo", arti: "suhu", kategori: "Mandi & Kebersihan" },
  { kanji: "お湯をかける", reading: "kakeru", arti: "menuangkan (air hangat)", kategori: "Mandi & Kebersihan" },
  { kanji: "汗をかく", reading: "kaku", arti: "berkeringat", kategori: "Mandi & Kebersihan" },
  { kanji: "シャンプー", reading: "shanpuu", arti: "sampo", kategori: "Mandi & Kebersihan" },
  { kanji: "消毒液", reading: "shoudoku eki", arti: "larutan antiseptik", kategori: "Mandi & Kebersihan" },
  { kanji: "清潔保持", reading: "seiketsu hoji", arti: "menjaga kebersihan tubuh", kategori: "Mandi & Kebersihan" },
  { kanji: "清拭", reading: "seishiki", arti: "mandi seka", kategori: "Mandi & Kebersihan" },
  { kanji: "洗髪", reading: "senpatsu", arti: "keramas", kategori: "Mandi & Kebersihan" },
  { kanji: "洗面器", reading: "senmen ki", arti: "cuci muka (baskom)", kategori: "Mandi & Kebersihan" },
  { kanji: "脱衣室", reading: "datsui shitsu", arti: "ruang ganti pakaian", kategori: "Mandi & Kebersihan" },
  { kanji: "入浴", reading: "nyuuyoku", arti: "mandi", kategori: "Mandi & Kebersihan" },
  { kanji: "ぬるい", reading: "nurui", arti: "suam-suam kuku", kategori: "Mandi & Kebersihan" },
  { kanji: "拭く", reading: "fuku", arti: "menyeka", kategori: "Mandi & Kebersihan" },
  { kanji: "浴室", reading: "yokushitsu", arti: "kamar mandi", kategori: "Mandi & Kebersihan" },
  { kanji: "浴槽", reading: "yokusou", arti: "bak mandi", kategori: "Mandi & Kebersihan" },
  { kanji: "リンス", reading: "rinsu", arti: "kondisioner", kategori: "Mandi & Kebersihan" },
  // URUSAN RUMAH
  { kanji: "おしぼり", reading: "oshibori", arti: "lap tangan basah", kategori: "Urusan Rumah" },
  { kanji: "カーテン", reading: "kaaten", arti: "tirai", kategori: "Urusan Rumah" },
  { kanji: "家事", reading: "kaji", arti: "pekerjaan rumah", kategori: "Urusan Rumah" },
  { kanji: "片付ける", reading: "katazukeru", arti: "membereskan", kategori: "Urusan Rumah" },
  { kanji: "乾かす", reading: "kawakasu", arti: "mengeringkan", kategori: "Urusan Rumah" },
  { kanji: "換気", reading: "kanki", arti: "pergantian udara", kategori: "Urusan Rumah" },
  { kanji: "シーツ", reading: "shiitsu", arti: "lembaran (seprai)", kategori: "Urusan Rumah" },
  { kanji: "洗濯物", reading: "sentakumono", arti: "cucian", kategori: "Urusan Rumah" },
  { kanji: "掃除機", reading: "soujiki", arti: "penyedot debu", kategori: "Urusan Rumah" },
  { kanji: "たたむ", reading: "tatamu", arti: "melipat", kategori: "Urusan Rumah" },
  { kanji: "調理", reading: "chouri", arti: "memasak", kategori: "Urusan Rumah" },
  { kanji: "掃く", reading: "haku", arti: "menyapu", kategori: "Urusan Rumah" },
  { kanji: "布団", reading: "futon", arti: "kasur", kategori: "Urusan Rumah" },
  { kanji: "ほうき", reading: "houki", arti: "sapu", kategori: "Urusan Rumah" },
  { kanji: "干す", reading: "hosu", arti: "menjemur", kategori: "Urusan Rumah" },
  { kanji: "枕", reading: "makura", arti: "bantal", kategori: "Urusan Rumah" },
  { kanji: "毛布", reading: "moufu", arti: "selimut", kategori: "Urusan Rumah" },
  { kanji: "モップ", reading: "moppu", arti: "alat pel", kategori: "Urusan Rumah" },
  // KERJA & FASILITAS
  { kanji: "観察", reading: "kansatsu", arti: "mengamati, observasi", kategori: "Kerja & Fasilitas" },
  { kanji: "行事", reading: "gyouji", arti: "acara", kategori: "Kerja & Fasilitas" },
  { kanji: "禁止", reading: "kinshi", arti: "larangan", kategori: "Kerja & Fasilitas" },
  { kanji: "計画", reading: "keikaku", arti: "rencana", kategori: "Kerja & Fasilitas" },
  { kanji: "掲示", reading: "keiji", arti: "pengumuman", kategori: "Kerja & Fasilitas" },
  { kanji: "ケース", reading: "keesu", arti: "kasus", kategori: "Kerja & Fasilitas" },
  { kanji: "玄関", reading: "genkan", arti: "area pintu masuk", kategori: "Kerja & Fasilitas" },
  { kanji: "参加者", reading: "sankasha", arti: "peserta", kategori: "Kerja & Fasilitas" },
  { kanji: "事故", reading: "jiko", arti: "kecelakaan", kategori: "Kerja & Fasilitas" },
  { kanji: "施設", reading: "shisetsu", arti: "fasilitas", kategori: "Kerja & Fasilitas" },
  { kanji: "就寝", reading: "shuushin", arti: "pergi tidur", kategori: "Kerja & Fasilitas" },
  { kanji: "出勤", reading: "shukkin", arti: "pergi bekerja", kategori: "Kerja & Fasilitas" },
  { kanji: "巡視", reading: "junshi", arti: "patroli", kategori: "Kerja & Fasilitas" },
  { kanji: "使用", reading: "shiyou", arti: "menggunakan", kategori: "Kerja & Fasilitas" },
  { kanji: "状況", reading: "joukyou", arti: "kondisi", kategori: "Kerja & Fasilitas" },
  { kanji: "ショートステイ", reading: "shooto sutei", arti: "tinggal jangka pendek", kategori: "Kerja & Fasilitas" },
  { kanji: "自立", reading: "jiritsu", arti: "kemandirian", kategori: "Kerja & Fasilitas" },
  { kanji: "送迎車", reading: "sougeisha", arti: "mobil antar-jemput", kategori: "Kerja & Fasilitas" },
  { kanji: "退勤", reading: "taikin", arti: "pulang bekerja", kategori: "Kerja & Fasilitas" },
  { kanji: "タイヤ", reading: "taiya", arti: "roda", kategori: "Kerja & Fasilitas" },
  { kanji: "建物", reading: "tatemono", arti: "bangunan", kategori: "Kerja & Fasilitas" },
  { kanji: "担当者", reading: "tantousha", arti: "staf penanggung jawab", kategori: "Kerja & Fasilitas" },
  { kanji: "調理員", reading: "chouriin", arti: "juru masak", kategori: "Kerja & Fasilitas" },
  { kanji: "転倒", reading: "tentou", arti: "terjatuh", kategori: "Kerja & Fasilitas" },
  { kanji: "ナースコール", reading: "naasu kooru", arti: "alat pemanggil perawat", kategori: "Kerja & Fasilitas" },
  { kanji: "日勤", reading: "nikkin", arti: "shift siang", kategori: "Kerja & Fasilitas" },
  { kanji: "濡れる", reading: "nureru", arti: "basah", kategori: "Kerja & Fasilitas" },
  { kanji: "吐く", reading: "haku", arti: "muntah", kategori: "Kerja & Fasilitas" },
  { kanji: "外す", reading: "hazusu", arti: "melepas", kategori: "Kerja & Fasilitas" },
  { kanji: "非常口", reading: "hijouguchi", arti: "pintu darurat", kategori: "Kerja & Fasilitas" },
  { kanji: "非常ベル", reading: "hijou beru", arti: "alarm darurat", kategori: "Kerja & Fasilitas" },
  { kanji: "119番", reading: "hyaku juukyuu ban", arti: "panggilan 119", kategori: "Kerja & Fasilitas" },
  { kanji: "服薬", reading: "fukuyaku", arti: "minum obat", kategori: "Kerja & Fasilitas" },
  { kanji: "変更", reading: "henkou", arti: "perubahan", kategori: "Kerja & Fasilitas" },
  { kanji: "報告", reading: "houkoku", arti: "laporan", kategori: "Kerja & Fasilitas" },
  { kanji: "ホール", reading: "hooru", arti: "aula", kategori: "Kerja & Fasilitas" },
  { kanji: "まつり", reading: "matsuri", arti: "festival", kategori: "Kerja & Fasilitas" },
  { kanji: "ミーティング", reading: "miitingu", arti: "pertemuan", kategori: "Kerja & Fasilitas" },
  { kanji: "見守り", reading: "mimamori", arti: "mengawasi", kategori: "Kerja & Fasilitas" },
  { kanji: "面会", reading: "menkai", arti: "besuk", kategori: "Kerja & Fasilitas" },
  { kanji: "申し送り", reading: "moushiokuri", arti: "serah-terima", kategori: "Kerja & Fasilitas" },
  { kanji: "夜勤", reading: "yakin", arti: "shift malam", kategori: "Kerja & Fasilitas" },
  { kanji: "流行", reading: "ryuukou", arti: "mewabah, epidemik", kategori: "Kerja & Fasilitas" },
  { kanji: "利用者", reading: "riyousha", arti: "pengguna", kategori: "Kerja & Fasilitas" },
  { kanji: "看護師", reading: "kangoshi", arti: "perawat", kategori: "Kerja & Fasilitas" },
  { kanji: "職員", reading: "shokuin", arti: "staf", kategori: "Kerja & Fasilitas" },
  { kanji: "パジャマ", reading: "pajama", arti: "piyama", kategori: "Kerja & Fasilitas" },
  { kanji: "呼び出しボタン", reading: "yobidashi botan", arti: "tombol panggil", kategori: "Kerja & Fasilitas" },
  { kanji: "確認", reading: "kakunin", arti: "memeriksa, memastikan", kategori: "Kerja & Fasilitas" },
];

const KATEGORI_WARNA = {
  "Bagian Tubuh": "#e74c3c",
  "Makanan & Minuman": "#e67e22",
  "Perawatan Makan": "#f39c12",
  "Berpindah & Posisi": "#27ae60",
  "Penyakit & Gejala": "#8e44ad",
  "Buang Air (Toilet)": "#2980b9",
  "Kebersihan Diri": "#16a085",
  "Mandi & Kebersihan": "#1abc9c",
  "Urusan Rumah": "#d35400",
  "Kerja & Fasilitas": "#2c3e50",
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getWrongOptions(correct, pool, field, count = 3) {
  const wrongs = pool
    .filter(v => v[field] !== correct[field])
    .map(v => v[field]);
  return shuffle([...new Set(wrongs)]).slice(0, count);
}

function generateQuestion(vocab, allVocab, mode) {
  if (mode === "kanji-to-arti") {
    const correct = vocab.arti;
    const wrongs = getWrongOptions(vocab, allVocab, "arti");
    return {
      prompt: vocab.kanji,
      furigana: vocab.reading,
      type: "Artinya?",
      options: shuffle([correct, ...wrongs]),
      correct,
    };
  } else if (mode === "arti-to-kanji") {
    const correct = vocab.kanji;
    const wrongs = getWrongOptions(vocab, allVocab, "kanji");
    return {
      prompt: vocab.arti,
      furigana: null,
      type: "Kata Jepangnya?",
      options: shuffle([correct, ...wrongs]),
      correct,
      correctReading: vocab.reading,
    };
  } else {
    const correct = vocab.reading;
    const wrongs = getWrongOptions(vocab, allVocab, "reading");
    return {
      prompt: vocab.kanji,
      furigana: null,
      type: "Cara bacanya?",
      options: shuffle([correct, ...wrongs]),
      correct,
    };
  }
}

const MODES = [
  { id: "kanji-to-arti", label: "Kanji → Arti", icon: "🇯🇵→🇮🇩" },
  { id: "arti-to-kanji", label: "Arti → Kanji", icon: "🇮🇩→🇯🇵" },
  { id: "kanji-to-reading", label: "Kanji → Furigana", icon: "漢→ふ" },
];

const SEMUA_KATEGORI = [...new Set(ALL_VOCAB.map(v => v.kategori))];

export default function KaigoQuiz() {
  const [screen, setScreen] = useState("menu"); // menu | quiz | result
  const [mode, setMode] = useState("kanji-to-arti");
  const [selectedKategori, setSelectedKategori] = useState(new Set(SEMUA_KATEGORI));
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showFuri, setShowFuri] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  const filteredVocab = ALL_VOCAB.filter(v => selectedKategori.has(v.kategori));

  function startQuiz() {
    const pool = shuffle(filteredVocab);
    const qs = pool.map(v => ({ ...generateQuestion(v, filteredVocab, mode), kategori: v.kategori, vocab: v }));
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setScreen("quiz");
    setAnimKey(k => k + 1);
  }

  function handleSelect(opt) {
    if (selected !== null) return;
    setSelected(opt);
    const q = questions[currentIdx];
    const correct = opt === q.correct;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { ...q, chosen: opt, correct }]);
  }

  function next() {
    if (currentIdx + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setAnimKey(k => k + 1);
    }
  }

  function toggleKategori(k) {
    setSelectedKategori(prev => {
      const next = new Set(prev);
      if (next.has(k)) { if (next.size > 1) next.delete(k); }
      else next.add(k);
      return next;
    });
  }

  const q = questions[currentIdx];
  const progress = questions.length ? ((currentIdx) / questions.length) * 100 : 0;

  if (screen === "menu") return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#f0f0f0", fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", padding: "20px 16px 40px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Saira+Condensed:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        .btn-mode { background: #1a1d27; border: 2px solid #2a2d3a; border-radius: 12px; color: #ccc; padding: 12px 16px; cursor: pointer; transition: all 0.18s; width: 100%; text-align: left; display: flex; align-items: center; gap: 10px; font-size: 15px; font-family: inherit; }
        .btn-mode.active { border-color: #4fc3f7; background: #142233; color: #4fc3f7; }
        .btn-mode:hover { border-color: #555; }
        .kat-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 99px; font-size: 12px; cursor: pointer; border: 1.5px solid; transition: all 0.15s; font-family: inherit; margin: 3px; }
        .start-btn { background: linear-gradient(135deg, #4fc3f7, #0288d1); color: #000; border: none; border-radius: 14px; padding: 16px 0; font-size: 18px; font-weight: 900; font-family: 'Saira Condensed', sans-serif; letter-spacing: 1px; cursor: pointer; width: 100%; margin-top: 24px; transition: transform 0.15s, box-shadow 0.15s; }
        .start-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,195,247,0.35); }
        .start-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
      `}</style>

      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 13, letterSpacing: 4, color: "#4fc3f7", textTransform: "uppercase", marginBottom: 6, fontFamily: "'Saira Condensed', sans-serif" }}>介護日本語</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, margin: 0, fontFamily: "'Saira Condensed', sans-serif", letterSpacing: 1 }}>KAIGO QUIZ</h1>
          <p style={{ color: "#888", fontSize: 13, marginTop: 6 }}>{ALL_VOCAB.length} kosakata • {SEMUA_KATEGORI.length} kategori</p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontFamily: "'Saira Condensed', sans-serif" }}>Mode Soal</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {MODES.map(m => (
              <button key={m.id} className={`btn-mode ${mode === m.id ? "active" : ""}`} onClick={() => setMode(m.id)}>
                <span style={{ fontSize: 18, minWidth: 36, textAlign: "center" }}>{m.icon}</span>
                <span>{m.label}</span>
                {mode === m.id && <span style={{ marginLeft: "auto", fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Saira Condensed', sans-serif" }}>Kategori</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setSelectedKategori(new Set(SEMUA_KATEGORI))} style={{ background: "none", border: "none", color: "#4fc3f7", fontSize: 11, cursor: "pointer", padding: 0 }}>Semua</button>
              <span style={{ color: "#444" }}>|</span>
              <button onClick={() => setSelectedKategori(new Set([SEMUA_KATEGORI[0]]))} style={{ background: "none", border: "none", color: "#888", fontSize: 11, cursor: "pointer", padding: 0 }}>Reset</button>
            </div>
          </div>
          <div>
            {SEMUA_KATEGORI.map(k => {
              const active = selectedKategori.has(k);
              const col = KATEGORI_WARNA[k];
              const count = ALL_VOCAB.filter(v => v.kategori === k).length;
              return (
                <button key={k} className="kat-chip" onClick={() => toggleKategori(k)}
                  style={{ borderColor: active ? col : "#2a2d3a", background: active ? col + "22" : "transparent", color: active ? col : "#666" }}>
                  <span>{k}</span>
                  <span style={{ opacity: 0.7, fontSize: 11 }}>{count}</span>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
            {filteredVocab.length} kata dipilih
          </div>
        </div>

        <div style={{ background: "#1a1d27", borderRadius: 12, padding: "12px 16px", marginBottom: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>ふ</span>
          <span style={{ flex: 1, fontSize: 13, color: "#aaa" }}>Tampilkan furigana saat soal</span>
          <div onClick={() => setShowFuri(s => !s)} style={{ width: 44, height: 24, borderRadius: 12, background: showFuri ? "#4fc3f7" : "#333", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: showFuri ? 22 : 2, transition: "left 0.2s" }} />
          </div>
        </div>

        <button className="start-btn" onClick={startQuiz} disabled={filteredVocab.length < 4}>
          MULAI KUIS ({filteredVocab.length} soal)
        </button>
      </div>
    </div>
  );

  if (screen === "result") return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#f0f0f0", fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", padding: "20px 16px 60px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Saira+Condensed:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        .res-row { padding: 10px 0; border-bottom: 1px solid #1e2130; }
        .back-btn { background: #1a1d27; border: 2px solid #2a2d3a; border-radius: 12px; color: #ccc; padding: 14px 0; font-size: 15px; cursor: pointer; width: 100%; font-family: inherit; margin-top: 12px; }
        .back-btn:hover { border-color: #4fc3f7; color: #4fc3f7; }
        .retry-btn { background: linear-gradient(135deg, #4fc3f7, #0288d1); color: #000; border: none; border-radius: 14px; padding: 16px 0; font-size: 18px; font-weight: 900; font-family: 'Saira Condensed', sans-serif; letter-spacing: 1px; cursor: pointer; width: 100%; margin-top: 12px; }
      `}</style>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "32px 0 24px" }}>
          <div style={{ fontSize: 64 }}>{score / questions.length >= 0.8 ? "🎉" : score / questions.length >= 0.5 ? "😊" : "💪"}</div>
          <div style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 48, fontWeight: 900, color: "#4fc3f7", lineHeight: 1 }}>{score}<span style={{ color: "#555" }}>/{questions.length}</span></div>
          <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>{Math.round(score / questions.length * 100)}% benar</div>
        </div>

        <div style={{ background: "#1a1d27", borderRadius: 16, padding: "16px", marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#888", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12, fontFamily: "'Saira Condensed', sans-serif" }}>Rekap Jawaban</div>
          {answers.map((a, i) => (
            <div key={i} className="res-row">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#aaa", marginBottom: 2 }}>
                    <span style={{ fontSize: 10, background: KATEGORI_WARNA[a.kategori] + "33", color: KATEGORI_WARNA[a.kategori], padding: "1px 6px", borderRadius: 4, marginRight: 6 }}>{a.kategori}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{a.prompt}</div>
                  {a.furigana && showFuri && <div style={{ fontSize: 11, color: "#888" }}>{a.furigana}</div>}
                  <div style={{ fontSize: 12, color: a.correct ? "#4caf50" : "#f44336", marginTop: 4 }}>
                    {a.correct ? "✓" : "✗"} {a.chosen}
                  </div>
                  {!a.correct && <div style={{ fontSize: 12, color: "#4caf50" }}>→ {a.correct}</div>}
                </div>
                <div style={{ fontSize: 20, marginLeft: 8 }}>{a.correct ? "✅" : "❌"}</div>
              </div>
            </div>
          ))}
        </div>

        <button className="retry-btn" onClick={startQuiz}>ULANGI KUIS</button>
        <button className="back-btn" onClick={() => setScreen("menu")}>← Kembali ke Menu</button>
      </div>
    </div>
  );

  // QUIZ SCREEN
  if (!q) return null;
  const kategoriColor = KATEGORI_WARNA[q.kategori] || "#4fc3f7";

  return (
    <div style={{ minHeight: "100vh", background: "#0f1117", color: "#f0f0f0", fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Saira+Condensed:wght@700;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes slideIn { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
        .quiz-card { animation: slideIn 0.3s ease; }
        .opt-btn { background: #1a1d27; border: 2px solid #252836; border-radius: 14px; color: #e0e0e0; padding: 14px 16px; cursor: pointer; width: 100%; text-align: left; font-size: 14px; font-family: inherit; transition: all 0.15s; line-height: 1.4; }
        .opt-btn:hover { border-color: #4fc3f7; }
        .opt-btn.correct { border-color: #4caf50; background: #0d2b1d; color: #4caf50; }
        .opt-btn.wrong { border-color: #f44336; background: #2b0d0d; color: #f44336; }
        .opt-btn.highlight { border-color: #4caf50; background: #0d2b1d; color: #4caf50; }
        .next-btn { background: linear-gradient(135deg, #4fc3f7, #0288d1); color: #000; border: none; border-radius: 14px; padding: 16px 0; font-size: 17px; font-weight: 900; font-family: 'Saira Condensed', sans-serif; letter-spacing: 1px; cursor: pointer; width: 100%; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "16px 16px 0", maxWidth: 480, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <button onClick={() => setScreen("menu")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 22, padding: 0 }}>←</button>
          <div style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 20, fontWeight: 700, color: "#4fc3f7" }}>
            {currentIdx + 1} <span style={{ color: "#444" }}>/ {questions.length}</span>
          </div>
          <div style={{ fontFamily: "'Saira Condensed', sans-serif", fontSize: 16, color: "#4caf50" }}>✓ {score}</div>
        </div>
        {/* Progress bar */}
        <div style={{ height: 4, background: "#1e2130", borderRadius: 2, marginBottom: 16 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${kategoriColor}, #4fc3f7)`, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
      </div>

      {/* Card */}
      <div key={animKey} className="quiz-card" style={{ flex: 1, padding: "0 16px 24px", maxWidth: 480, margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Kategori badge */}
        <div style={{ display: "inline-flex", alignSelf: "flex-start", background: kategoriColor + "22", color: kategoriColor, borderRadius: 8, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>
          {q.kategori}
        </div>

        {/* Question */}
        <div style={{ background: "#1a1d27", borderRadius: 20, padding: "24px 20px", textAlign: "center", border: `1px solid ${kategoriColor}33` }}>
          <div style={{ fontSize: 12, color: "#888", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12, fontFamily: "'Saira Condensed', sans-serif" }}>{q.type}</div>
          <div style={{ fontSize: q.prompt.length > 8 ? 22 : 36, fontWeight: 900, lineHeight: 1.3, marginBottom: q.furigana && showFuri ? 6 : 0 }}>
            {q.prompt}
          </div>
          {q.furigana && showFuri && (
            <div style={{ fontSize: 14, color: "#aaa", marginTop: 4 }}>{q.furigana}</div>
          )}
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            let cls = "opt-btn";
            let prefix = String.fromCharCode(12450 + i); // ア イ ウ エ (katakana A I U E)
            const KATAKANA = ["ア", "イ", "ウ", "エ"];
            prefix = KATAKANA[i] || String(i + 1);
            if (selected !== null) {
              if (opt === q.correct) cls += " correct";
              else if (opt === selected && selected !== q.correct) cls += " wrong";
            }
            return (
              <button key={opt} className={cls} onClick={() => handleSelect(opt)}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span style={{ minWidth: 28, height: 28, borderRadius: 8, background: selected === null ? "#252836" : opt === q.correct ? "#4caf50" : opt === selected ? "#f44336" : "#252836", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: selected !== null && (opt === q.correct || opt === selected) ? "#fff" : "#aaa", fontFamily: "'Saira Condensed', sans-serif", flexShrink: 0 }}>{prefix}</span>
                  <span>{opt}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback & next */}
        {selected !== null && (
          <div style={{ animation: "slideIn 0.25s ease" }}>
            <div style={{ background: selected === q.correct ? "#0d2b1d" : "#2b0d0d", borderRadius: 12, padding: "12px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{selected === q.correct ? "✅" : "❌"}</span>
              <div>
                <div style={{ fontWeight: 700, color: selected === q.correct ? "#4caf50" : "#f44336", fontSize: 14 }}>
                  {selected === q.correct ? "Benar!" : "Salah!"}
                </div>
                {selected !== q.correct && (
                  <div style={{ fontSize: 13, color: "#aaa", marginTop: 2 }}>Jawaban: <strong style={{ color: "#4caf50" }}>{q.correct}</strong></div>
                )}
                {q.correctReading && (
                  <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>({q.correctReading})</div>
                )}
              </div>
            </div>
            <button className="next-btn" onClick={next}>
              {currentIdx + 1 >= questions.length ? "LIHAT HASIL →" : "LANJUT →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
