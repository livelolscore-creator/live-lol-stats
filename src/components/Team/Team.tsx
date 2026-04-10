import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/teamStyle.css";

interface TeamData {
    name: string;
    code: string;
    league: string;
    leagueSlug: string;
    image: string;
    region: string;
    founded: string;
    description: string;
    roster?: { name: string; role: string; image?: string }[];
}

const TEAMS_DATA: Record<string, TeamData> = {
    // LCK
    "t1": { 
        name: "T1", code: "T1", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191256557.png", 
        region: "South Korea", founded: "2018", 
        description: "T1 is a South Korean professional League of Legends team owned by SK Telecom CS1. The organization has won four World Championship titles, making them one of the most successful esports organizations in League of Legends history.",
        roster: [
            { name: "Oner", role: "Jungle" },
            { name: "Faker", role: "Mid" },
            { name: "Gumayusi", role: "ADC" },
            { name: "Keria", role: "Support" },
            { name: "Doran", role: "Top" }
        ]
    },
    "gen-g": { 
        name: "Gen.G", code: "GEN", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191305813.png", 
        region: "South Korea", founded: "2017", 
        description: "Gen.G is a South Korean professional esports organization that competes in League of Legends Champions Korea. Known for their strategic play and strong organizational infrastructure.",
        roster: [
            { name: "Peanut", role: "Jungle" },
            { name: "Chovy", role: "Mid" },
            { name: "Peyz", role: "ADC" },
            { name: "Delight", role: "Support" },
            { name: "Kiin", role: "Top" }
        ]
    },
    "hle": { 
        name: "Hanwha Life Esports", code: "HLE", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191256554.png", 
        region: "South Korea", founded: "2016", 
        description: "Hanwha Life Esports represents Hanwha Life Insurance in League of Legends. The team has built a reputation for developing talented players and competitive performances.",
        roster: [
            { name: "Peanut", role: "Jungle" },
            { name: "Zeka", role: "Mid" },
            { name: "Viper", role: "ADC" },
            { name: "Life", role: "Support" },
            { name: "Kingen", role: "Top" }
        ]
    },
    "dk": { 
        name: "Dplus KIA", code: "DK", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191305808.png", 
        region: "South Korea", founded: "2019", 
        description: "Dplus KIA, formerly known as DAMWON Gaming, won the 2020 World Championship. They continue to be a dominant force in the LCK.",
        roster: [
            { name: "Canyon", role: "Jungle" },
            { name: "ShowMaker", role: "Mid" },
            { name: "Aiming", role: "ADC" },
            { name: "Kellin", role: "Support" },
            { name: "Hoya", role: "Top" }
        ]
    },
    "bfox": { 
        name: "BNK FOX", code: "BFX", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/bnk.png", 
        region: "South Korea", founded: "2023", 
        description: "BNK FOX is a South Korean League of Legends team competing in the LCK.",
        roster: [
            { name: "Crizzly", role: "Jungle" },
            { name: "Bdd", role: "Mid" },
            { name: "Bull", role: "ADC" },
            { name: "Effort", role: "Support" },
            { name: "Khan", role: "Top" }
        ]
    },
    "ns": { 
        name: "NS", code: "NS", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/ns.png", 
        region: "South Korea", founded: "2020", 
        description: "NS is a South Korean League of Legends team competing in the LCK.",
        roster: [
            { name: "Peanut", role: "Jungle" },
            { name: "Bdd", role: "Mid" },
            { name: "Dice", role: "ADC" },
            { name: "Peter", role: "Support" },
            { name: "Dnky", role: "Top" }
        ]
    },
    "dns": { 
        name: "DN Magic", code: "DNS", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/dns.png", 
        region: "South Korea", founded: "2023", 
        description: "DN Magic is a South Korean League of Legends team competing in the LCK.",
        roster: [
            { name: "Yagao", role: "Jungle" },
            { name: "S", role: "Mid" },
            { name: "LP", role: "ADC" },
            { name: "x", role: "Support" },
            { name: "Rich", role: "Top" }
        ]
    },
    "krx": { 
        name: "KRX", code: "KRX", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/krx.png", 
        region: "South Korea", founded: "2023", 
        description: "KRX is a South Korean League of Legends team competing in the LCK.",
        roster: [
            { name: "Jett", role: "Jungle" },
            { name: "Dove", role: "Mid" },
            { name: "H1gar", role: "ADC" },
            { name: "Gu", role: "Support" },
            { name: "Burdol", role: "Top" }
        ]
    },
    "kt": { 
        name: "KT Rolster", code: "KT", league: "LCK", leagueSlug: "lck", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/kt.png", 
        region: "South Korea", founded: "2013", 
        description: "KT Rolster is a legendary South Korean esports organization with a rich history in League of Legends.",
        roster: [
            { name: "Cuzz", role: "Jungle" },
            { name: "Bdd", role: "Mid" },
            { name: "Aiming", role: "ADC" },
            { name: "Lehends", role: "Support" },
            { name: "Kiin", role: "Top" }
        ]
    },
    // LEC
    "g2": { 
        name: "G2 Esports", code: "G2", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191266232.png", 
        region: "Europe", founded: "2014", 
        description: "G2 Esports is a German professional esports organization. They have won multiple LEC titles and are known for their innovative strategies and roster decisions.",
        roster: [
            { name: "Yike", role: "Jungle" },
            { name: "Caps", role: "Mid" },
            { name: "Hans Sama", role: "ADC" },
            { name: "Mikyx", role: "Support" },
            { name: "BrokenBlade", role: "Top" }
        ]
    },
    "fnc": { 
        name: "Fnatic", code: "FNC", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191266227.png", 
        region: "Europe", founded: "2004", 
        description: "Fnatic is one of the most storied esports organizations in the world. Their League of Legends team has competed in every World Championship.",
        roster: [
            { name: "Razork", role: "Jungle" },
            { name: "Humanoid", role: "Mid" },
            { name: "Noah", role: "ADC" },
            { name: "Jun", role: "Support" },
            { name: "Oscarinin", role: "Top" }
        ]
    },
    "mkoisports": { 
        name: "MKOI", code: "MKOI", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/mkoi.png", 
        region: "Europe", founded: "2022", 
        description: "MKOI is a European esports organization competing in the LEC.",
        roster: [
            { name: "Elyoya", role: "Jungle" },
            { name: "Ruby", role: "Mid" },
            { name: "Jacks", role: "ADC" },
            { name: "Mersa", role: "Support" },
            { name: "Fresskowy", role: "Top" }
        ]
    },
    "vit": { 
        name: "Team Vitality", code: "VIT", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/vit.png", 
        region: "Europe", founded: "2013", 
        description: "Team Vitality is a French esports organization competing in the LEC.",
        roster: [
            { name: "Dag", role: "Jungle" },
            { name: "Vetheo", role: "Mid" },
            { name: "Upset", role: "ADC" },
            { name: "Hylissang", role: "Support" },
            { name: "Phaxi", role: "Top" }
        ]
    },
    "gx": { 
        name: "Gamer x", code: "GX", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/gx.png", 
        region: "Europe", founded: "2024", 
        description: "Gamer x is a European esports organization competing in the LEC.",
        roster: [
            { name: "Meteos", role: "Jungle" },
            { name: "Jack", role: "Mid" },
            { name: "Kikis", role: "ADC" },
            { name: "Nixer", role: "Support" },
            { name: "Kingen", role: "Top" }
        ]
    },
    "th": { 
        name: "TH", code: "TH", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/th.png", 
        region: "Europe", founded: "2023", 
        description: "TH is a European esports organization competing in the LEC.",
        roster: [
            { name: "Markoon", role: "Jungle" },
            { name: "Vetheo", role: "Mid" },
            { name: "Caliculus", role: "ADC" },
            { name: "K", role: "Support" },
            { name: "Chrille", role: "Top" }
        ]
    },
    "sk": { 
        name: "SK Gaming", code: "SK", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/sk.png", 
        region: "Europe", founded: "1997", 
        description: "SK Gaming is a legendary German esports organization with a long history in competitive gaming.",
        roster: [
            { name: "Glaicle", role: "Jungle" },
            { name: "Sert", role: "Mid" },
            { name: "Exacker", role: "ADC" },
            { name: "Daji", role: "Support" },
            { name: "Ironeagle", role: "Top" }
        ]
    },
    "navi": { 
        name: "Natus Vincere", code: "NAVI", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191266232.png", 
        region: "Europe", founded: "2006", 
        description: "Natus Vincere is a Ukrainian esports organization competing in the LEC.",
        roster: [
            { name: "Blaber", role: "Jungle" },
            { name: "Canyon", role: "Mid" },
            { name: "Upset", role: "ADC" },
            { name: "Mikyx", role: "Support" },
            { name: "Wunder", role: "Top" }
        ]
    },
    "shft": { 
        name: "SHFT", code: "SHFT", league: "LEC", leagueSlug: "lec", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/shft.png", 
        region: "Europe", founded: "2024", 
        description: "SHFT is a European esports organization competing in the LEC.",
        roster: [
            { name: "Spar", role: "Jungle" },
            { name: "Kepe", role: "Mid" },
            { name: "Rash", role: "ADC" },
            { name: "Luna", role: "Support" },
            { name: "Vik", role: "Top" }
        ]
    },
    // LCS
    "c9": { 
        name: "Cloud9", code: "C9", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191305781.png", 
        region: "North America", founded: "2013", 
        description: "Cloud9 is an American professional esports organization. They have won multiple LCS championships and continue to be a top contender in North American League of Legends.",
        roster: [
            { name: "Blaber", role: "Jungle" },
            { name: "Emenes", role: "Mid" },
            { name: "Berserker", role: "ADC" },
            { name: "Zven", role: "Support" },
            { name: "Fudge", role: "Top" }
        ]
    },
    "tl": { 
        name: "Team Liquid", code: "TL", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191305793.png", 
        region: "North America", founded: "2000", 
        description: "Team Liquid is a multi-regional professional esports organization. Their League of Legends team competes in the LCS and has achieved numerous championship victories.",
        roster: [
            { name: "Pyosik", role: "Jungle" },
            { name: "APA", role: "Mid" },
            { name: "Yeon", role: "ADC" },
            { name: "CoreJJ", role: "Support" },
            { name: "Summit", role: "Top" }
        ]
    },
    "dig": { 
        name: "Dignitas", code: "DIG", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/dig.png", 
        region: "North America", founded: "2013", 
        description: "Dignitas is an American esports organization competing in the LCS.",
        roster: [
            { name: "Aikes", role: "Jungle" },
            { name: "Dove", role: "Mid" },
            { name: "Spawn", role: "ADC" },
            { name: "Rio", role: "Support" },
            { name: "Rich", role: "Top" }
        ]
    },
    "sr": { 
        name: "Shopify Rebellion", code: "SR", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/sr.png", 
        region: "North America", founded: "2023", 
        description: "Shopify Rebellion is an esports organization backed by Shopify, competing in the LCS.",
        roster: [
            { name: "Swif", role: "Jungle" },
            { name: "Insulator", role: "Mid" },
            { name: "Raptor", role: "ADC" },
            { name: "Zven", role: "Support" },
            { name: "Viper", role: "Top" }
        ]
    },
    "tlaw": { 
        name: "TLAW", code: "TLAW", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/tlaw.png", 
        region: "North America", founded: "2024", 
        description: "TLAW is an American esports organization competing in the LCS.",
        roster: [
            { name: "J objet", role: "Jungle" },
            { name: "Take", role: "Mid" },
            { name: "Dag", role: "ADC" },
            { name: "Busio", role: "Support" },
            { name: "Philip", role: "Top" }
        ]
    },
    "fly": { 
        name: "FlyQuest", code: "FLY", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/fly.png", 
        region: "North America", founded: "2017", 
        description: "FlyQuest is an American esports organization competing in the LCS.",
        roster: [
            { name: "K", role: "Jungle" },
            { name: "Vetheo", role: "Mid" },
            { name: "Prince", role: "ADC" },
            { name: "Massu", role: "Support" },
            { name: "Impact", role: "Top" }
        ]
    },
    "dsg": { 
        name: "Disguised", code: "DSG", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/dsg.png", 
        region: "North America", founded: "2023", 
        description: "Disguised is an American esports organization competing in the LCS.",
        roster: [
            { name: "Luka", role: "Jungle" },
            { name: "Viper", role: "Mid" },
            { name: "KDO", role: "ADC" },
            { name: "Bree", role: "Support" },
            { name: "Rich", role: "Top" }
        ]
    },
    "sen": { 
        name: "Sentinels", code: "SEN", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/sen.png", 
        region: "North America", founded: "2013", 
        description: "Sentinels is an American esports organization with a strong presence in VALORANT and League of Legends.",
        roster: [
            { name: "Sniper", role: "Jungle" },
            { name: "Touc", role: "Mid" },
            { name: "Blaber", role: "ADC" },
            { name: "K", role: "Support" },
            { name: "Ssumday", role: "Top" }
        ]
    },
    "lyon": { 
        name: "Lyon Esports", code: "LYON", league: "LCS", leagueSlug: "lcs", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/lyon.png", 
        region: "North America", founded: "2024", 
        description: "Lyon Esports is an American esports organization competing in the LCS.",
        roster: [
            { name: "Luka", role: "Jungle" },
            { name: "Yagao", role: "Mid" },
            { name: "Boost", role: "ADC" },
            { name: "Luna", role: "Support" },
            { name: "Chovy", role: "Top" }
        ]
    },
    // LPL
    "tes": { 
        name: "Top Esports", code: "TES", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/tes.png", 
        region: "China", founded: "2017", 
        description: "Top Esports is a Chinese professional League of Legends team. They are one of the top contenders in the LPL.",
        roster: [
            { name: "Kanavi", role: "Jungle" },
            { name: "Creme", role: "Mid" },
            { name: "JackeyLove", role: "ADC" },
            { name: "Meiko", role: "Support" },
            { name: "Wayward", role: "Top" }
        ]
    },
    "we": { 
        name: "Team WE", code: "WE", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/we.png", 
        region: "China", founded: "2012", 
        description: "Team WE is a legendary Chinese esports organization with a rich history in League of Legends.",
        roster: [
            { name: "H4cker", role: "Jungle" },
            { name: "FoFo", role: "Mid" },
            { name: "Stay", role: "ADC" },
            { name: "Ked", role: "Support" },
            { name: "Cube", role: "Top" }
        ]
    },
    "nip": { 
        name: "Ninjas in Pyjamas", code: "NIP", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/nip.png", 
        region: "China", founded: "2007", 
        description: "Ninjas in Pyjamas is a Swedish esports organization that competes in the LPL.",
        roster: [
            { name: "XLB", role: "Jungle" },
            { name: "Dream", role: "Mid" },
            { name: "Photon", role: "ADC" },
            { name: "Zhu", role: "Support" },
            { name: "Invincible", role: "Top" }
        ]
    },
    "ig": { 
        name: "Invictus Gaming", code: "IG", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/ig.png", 
        region: "China", founded: "2011", 
        description: "Invictus Gaming is a Chinese esports organization. They won the 2018 World Championship.",
        roster: [
            { name: "Tian", role: "Jungle" },
            { name: "Cryin", role: "Mid" },
            { name: "Ahn", role: "ADC" },
            { name: "Wink", role: "Support" },
            { name: "neny", role: "Top" }
        ]
    },
    "al": { 
        name: "Anyone's Legend", code: "AL", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/al.png", 
        region: "China", founded: "2022", 
        description: "Anyone's Legend is a Chinese esports organization competing in the LPL.",
        roster: [
            { name: "K", role: "Jungle" },
            { name: "Harder", role: "Mid" },
            { name: "Fear", role: "ADC" },
            { name: "Kael", role: "Support" },
            { name: "Zaza", role: "Top" }
        ]
    },
    "jdg": { 
        name: "JD Gaming", code: "JDG", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191305772.png", 
        region: "China", founded: "2017", 
        description: "JD Gaming is a Chinese professional League of Legends team. They have established themselves as one of the top teams in the LPL.",
        roster: [
            { name: "Ruler", role: "ADC" },
            { name: "Knight", role: "Mid" },
            { name: "Missing", role: "Support" },
            { name: "Ale", role: "Top" },
            { name: "Jiejie", role: "Jungle" }
        ]
    },
    "blg": { 
        name: "Bilibili Gaming", code: "BLG", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/98781191305769.png", 
        region: "China", founded: "2016", 
        description: "Bilibili Gaming is a Chinese esports organization backed by video platform Bilibili. They are competitive contenders in the LPL.",
        roster: [
            { name: "Xun", role: "Jungle" },
            { name: "Knight", role: "Mid" },
            { name: "Elk", role: "ADC" },
            { name: "ON", role: "Support" },
            { name: "Bin", role: "Top" }
        ]
    },
    "wbg": { 
        name: "Weibo Gaming", code: "WBG", league: "LPL", leagueSlug: "lpl", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/wbg.png", 
        region: "China", founded: "2021", 
        description: "Weibo Gaming is a Chinese esports organization backed by Weibo. They compete in the LPL.",
        roster: [
            { name: "Jiejie", role: "Jungle" },
            { name: "Xiaohu", role: "Mid" },
            { name: "Light", role: "ADC" },
            { name: "Crisp", role: "Support" },
            { name: "TheShy", role: "Top" }
        ]
    },
    // LCP
    "gam": { 
        name: "GAM Esports", code: "GAM", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/gam.png", 
        region: "Vietnam", founded: "2016", 
        description: "GAM Esports is a Vietnamese esports organization. They are the most successful team in Vietnam.",
        roster: [
            { name: "Levi", role: "Jungle" },
            { name: "Slay", role: "Mid" },
            { name: "Nuri", role: "ADC" },
            { name: "Moe", role: "Support" },
            { name: "Kiaya", role: "Top" }
        ]
    },
    "tsw": { 
        name: "TSW", code: "TSW", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/tsw.png", 
        region: "Taiwan", founded: "2023", 
        description: "TSW is a Taiwanese esports organization competing in the LCP.",
        roster: [
            { name: "Gemique", role: "Jungle" },
            { name: "Mission", role: "Mid" },
            { name: "Wako", role: "ADC" },
            { name: "Kris", role: "Support" },
            { name: "Han", role: "Top" }
        ]
    },
    "shg": { 
        name: "SHG Esports", code: "SHG", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/shg.png", 
        region: "South Korea", founded: "2023", 
        description: "SHG Esports is a South Korean esports organization competing in the LCP.",
        roster: [
            { name: "GIDE", role: "Jungle" },
            { name: "Bdd", role: "Mid" },
            { name: "H1gar", role: "ADC" },
            { name: "Effort", role: "Support" },
            { name: "Khan", role: "Top" }
        ]
    },
    "cfo": { 
        name: "CFO", code: "CFO", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/cfo.png", 
        region: "Taiwan", founded: "2023", 
        description: "CFO is a Taiwanese esports organization competing in the LCP.",
        roster: [
            { name: "K soaking", role: "Jungle" },
            { name: "M1", role: "Mid" },
            { name: "Shunn", role: "ADC" },
            { name: "Kenny", role: "Support" },
            { name: "3NA", role: "Top" }
        ]
    },
    "dcg": { 
        name: "DCG", code: "DCG", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/dcg.png", 
        region: "Taiwan", founded: "2023", 
        description: "DCG is a Taiwanese esports organization competing in the LCP.",
        roster: [
            { name: "JUnhandled", role: "Jungle" },
            { name: "Chu", role: "Mid" },
            { name: "Piko", role: "ADC" },
            { name: "KoA", role: "Support" },
            { name: "Yursan", role: "Top" }
        ]
    },
    "mvk": { 
        name: "MEGA", code: "MVK", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/mvk.png", 
        region: "Philippines", founded: "2023", 
        description: "MEGA is a Filipino esports organization competing in the LCP.",
        roster: [
            { name: "Jaya", role: "Jungle" },
            { name: "Exosen", role: "Mid" },
            { name: "Dubsty", role: "ADC" },
            { name: "R", role: "Support" },
            { name: "Joc", role: "Top" }
        ]
    },
    "dfm": { 
        name: "DetonatioN FocusMe", code: "DFM", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/dfm.png", 
        region: "Japan", founded: "2016", 
        description: "DetonatioN FocusMe is a Japanese esports organization. They are the most successful team in Japan.",
        roster: [
            { name: "Steal", role: "Jungle" },
            { name: "Yutapon", role: "Mid" },
            { name: "Harp", role: "ADC" },
            { name: "Gaeng", role: "Support" },
            { name: "Dusa", role: "Top" }
        ]
    },
    "gz": { 
        name: "G2", code: "GZ", league: "LCP", leagueSlug: "lcp", 
        image: "https://lolesports.com/stores/teams/uploads/team_logo_id/gz.png", 
        region: "Oceania", founded: "2023", 
        description: "G2 is an Oceanian esports organization competing in the LCP.",
        roster: [
            { name: "Babip", role: "Jungle" },
            { name: "Tgee", role: "Mid" },
            { name: "Valor", role: "ADC" },
            { name: "Eyla", role: "Support" },
            { name: "Froggen", role: "Top" }
        ]
    },
};

export function Team({ match }: any) {
    const [teamData, setTeamData] = useState<TeamData | null>(null);
    
    const teamSlug = match.params.team;
    const location = useLocation();
    

    useEffect(() => {
        const locationState = location.state as { teamData?: TeamData } | null;
        const passedData = locationState?.teamData;
        const staticData = Object.values(TEAMS_DATA).find(t => t.code.toLowerCase() === teamSlug.toLowerCase());
        let team = passedData || staticData || null;
        if (team && staticData && !team.roster) {
            team = { ...team, roster: staticData.roster };
        }
        setTeamData(team);

        if (team) {
            const seoTitle = `${team.name} (${team.code}) - ${team.league} Team Profile, Schedule & Results 2025 | LiveLoLScore`;
            const seoDescription = `View ${team.name} team profile, upcoming schedule, recent results, and standings. Track ${team.code} in ${team.league} esports. ${team.region} team founded in ${team.founded}.`;
            const keywords = `${team.name}, ${team.code}, ${team.league} team, ${team.name} schedule, ${team.name} results, ${team.name} roster`;

            document.title = seoTitle;
            
            const metaDescription = document.querySelector('meta[name="description"]');
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            const ogTitle = document.querySelector('meta[property="og:title"]');
            const ogDescription = document.querySelector('meta[property="og:description"]');
            
            if (metaDescription) metaDescription.setAttribute("content", seoDescription);
            if (metaKeywords) metaKeywords.setAttribute("content", keywords);
            if (ogTitle) ogTitle.setAttribute("content", seoTitle);
            if (ogDescription) ogDescription.setAttribute("content", seoDescription);
        }

        return () => {
            const metaDescription = document.querySelector('meta[name="description"]');
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaDescription) metaDescription.setAttribute("content", "Track live League of Legends esports matches in real-time.");
            if (metaKeywords) metaKeywords.setAttribute("content", "League of Legends esports, LoL live scores");
        };
    }, [teamSlug, teamData]);

    

    if (!teamData) {
        return (
            <div className="team-container">
                <div className="team-error">Team not found</div>
            </div>
        );
    }

    return (
        <div className="team-container">
            <div className="team-breadcrumb">
                <a href="/">Home</a> / <a href={`/league/${teamData.leagueSlug}/`}>{teamData.league}</a> / <span>{teamData.name}</span>
            </div>

            <div className="team-header">
                <div className="team-logo">
                    <img src={teamData.image} alt={teamData.name} />
                </div>
                <div className="team-info">
                    <h1 className="team-name">{teamData.name}</h1>
                    <div className="team-meta">
                        <span className="team-code">{teamData.code}</span>
                        <span className="team-separator">|</span>
                        <span className="team-league">{teamData.league}</span>
                        <span className="team-separator">|</span>
                        <span className="team-region">{teamData.region}</span>
                    </div>
                </div>
            </div>

            <div className="team-content">
                {teamData.roster && teamData.roster.length > 0 && (
                    <div className="team-roster">
                        <h2>Current Roster</h2>
                        <div className="roster-grid">
                            {teamData.roster.map((player, index) => (
                                <div key={index} className="roster-card">
                                    <div className="player-avatar">
                                        {player.name.charAt(0)}
                                    </div>
                                    <div className="player-info">
                                        <span className="player-name">{player.name}</span>
                                        <span className="player-role">{player.role}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                

                <div className="team-description">
                    <h2>About {teamData.name}</h2>
                    <p>{teamData.description}</p>
                </div>

                <div className="team-stats">
                    <div className="stat-card">
                        <span className="stat-label">League</span>
                        <span className="stat-value">{teamData.league}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Region</span>
                        <span className="stat-value">{teamData.region}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Founded</span>
                        <span className="stat-value">{teamData.founded}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Team Code</span>
                        <span className="stat-value">{teamData.code}</span>
                    </div>
                </div>
            </div>

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SportsTeam",
                    "name": teamData.name,
                    "alternateName": teamData.code,
                    "sport": "Esports",
                    "memberOf": {
                        "@type": "SportsOrganization",
                        "name": teamData.league
                    },
                    "location": {
                        "@type": "Place",
                        "name": teamData.region
                    },
                    "url": `https://lolesports.com`
                })
            }} />
        </div>
    );
}
