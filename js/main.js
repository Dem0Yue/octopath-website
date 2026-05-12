/* ===================================================
   八方旅人 Octopath Traveler - 主脚本
   功能：登录认证 | 时钟 | 防沉迷 | 音乐 | 角色弹窗
   =================================================== */

// ========== 角色数据 ==========
const CHARACTERS = {
  olberic: {
    name: '欧贝利克',
    en: 'Olberic',
    job: '剑士',
    hometown: '柯鲁帝亚王国',
    cmd: '决斗',
    cmdDesc: '与 NPC 进行模拟比武，胜利后可获得经验与道具',
    bg: '曾是柯鲁帝亚王国的王家骑士，在王国覆灭后失去了一切。如今以四处旅行的佣兵身份活着，直到他找到了新的战斗意义——守护弱者。',
    skills: ['横一文字斩（全体剑攻击）', '蓄力（物攻↑3回合）', '一番枪（单体枪攻击）', '挑拨（吸引敌人仇恨）', '十文字斩（单体剑攻击）', '鉄壁（物防↑3回合）'],
    weapon: '剑 / 枪',
    elem: '无属性'
  },
  therion: {
    name: '提里昂',
    en: 'Therion',
    job: '盗贼',
    hometown: '不知',
    cmd: '偷盗',
    cmdDesc: '从 NPC 身上偷取稀有道具，但失败会增加邪道值',
    bg: '神秘的盗贼，身上背负着某个被封印的诅咒。过去是一片空白，只知道他有一枚神秘吊坠，与一段痛苦的记忆紧紧相连。',
    skills: ['偷盗（偷取道具）', '上锁（阻止敌人逃跑）', '暗器投掷（单体暗器攻击）', '隐蔽（自身回避↑）', '毒刃（附加中毒）'],
    weapon: '短剑 / 剑',
    elem: '暗属性'
  },
  haanit: {
    name: '海茵特',
    en: "H'aanit",
    job: '猎人',
    hometown: '爱德拉斯城',
    cmd: '指使',
    cmdDesc: '命令魔物为 NPC 服务，可获得经验、道具或移动 NPC 位置',
    bg: '来自爱德拉斯城的女猎人，师父被魔物带走后，她踏上寻找师父的旅程。她的搭档是雪豹「琳德」。',
    skills: ['乱射（随机弓攻击5~8回）', '会心之矢（必爆击单体弓）', '电鸟（单体雷属性）', '网（减慢敌人行动顺序）', '目标锁定（全队爆击/命中↑）'],
    weapon: '弓 / 斧',
    elem: '雷属性'
  },
  primrose: {
    name: '普里姆萝斯',
    en: 'Primrose',
    job: '舞女',
    hometown: '周日之国',
    cmd: '诱惑',
    cmdDesc: '让 NPC 加入队伍短暂协助战斗，失败增加邪道值',
    bg: '周日之国的贵族千金，父亲被三位绅士暗杀。为复仇苦练剑术的她，优雅舞步中隐藏着复仇者的锋芒。',
    skills: ['舞蹈（全体风属性攻击）', '希望之歌（全队增益延长）', '诱惑之舞（敌人混乱）', '齐心协力（协助攻击）', '月影（单体风属性高伤）'],
    weapon: '短剑',
    elem: '风属性'
  },
  cyrus: {
    name: '赛拉斯',
    en: 'Cyrus',
    job: '学者',
    hometown: '克雷斯摩根图书馆',
    cmd: '调查',
    cmdDesc: '暗地里调查 NPC 获取情报，胜利后可了解隐藏信息',
    bg: '克雷斯摩根图书馆的学者，在调查古代文献时发现恩师被卷入了某个阴谋。为寻找恩师下落，他踏遍奥鲁斯特拉大陆。',
    skills: ['火炎魔法（全体火属性）', '冰结魔法（全体冰属性）', '雷击魔法（全体雷属性）', '予习（战斗中预知弱点）', '大魔法（特大属性攻击）'],
    weapon: '杖',
    elem: '火/冰/雷属性'
  },
  ophilia: {
    name: '奥菲利亚',
    en: 'Ophilia',
    job: '神官',
    hometown: '圣火教团',
    cmd: '导引',
    cmdDesc: '引导 NPC 暂时加入队伍，导引的 NPC 可在战斗中使用',
    bg: '圣火教团的神官，为完成教团使命与挚友莉莎珞一同踏上旅途。在旅途中学到了信仰的真正含义。',
    skills: ['回复魔法（全体HP回复）', '圣光（单体光属性）', '守护（单体属防↑）', '大回复魔法（全体大回复）', '复活魔法（全体复活）'],
    weapon: '杖',
    elem: '光属性'
  },
  alfyn: {
    name: '阿芬',
    en: 'Alfyn',
    job: '药师',
    hometown: '维雅布鲁克村',
    cmd: '调药',
    cmdDesc: '将采集的草药调和为药水，可对 NPC 使用恢复HP或获得情报',
    bg: '维雅布鲁克村长大的药师，在旅途中救死扶伤，用调配的药物治疗每一位需要帮助的人，即使对方是曾经的敌人。',
    skills: ['调药（制作恢复道具）', '毒药（敌人中毒）', '体力药剂（单体HP大回复）', '活力灵药（全体SP回复）', '调和（高阶药剂）'],
    weapon: '斧',
    elem: '冰属性'
  },
  tressa: {
    name: '特蕾莎',
    en: 'Tressa',
    job: '商人',
    hometown: '港口城市戈尔戈农',
    cmd: '雇用',
    cmdDesc: '雇用 NPC 成为临时伙伴协助战斗或服务，每次消耗叶币',
    bg: '戈尔戈农港口城市长大的少女，从小跟随商队走南闯北。在一次遭遇海盗后，她决定亲自踏上旅途，寻找「那个人」的秘密。',
    skills: ['雇用（临时伙伴协助）', '物品收集（NPC处购买道具）', '全员激励（我方全体攻击↑）', '讨价还价（商店折扣）', '连携攻击（与伙伴组合攻击）'],
    weapon: '长枪 / 弓',
    elem: '火属性'
  }
};

// ========== 常量 ==========
const DEFAULT_COUNTDOWN = 30 * 60; // 30分钟（秒）
const DEFAULT_LOCK     = 10 * 60;  // 10分钟（秒）
const STORAGE_KEY_LOGGED_IN = 'octopath_logged_in';
const STORAGE_KEY_USERNAME  = 'octopath_username';
const STORAGE_KEY_COUNT      = 'octopath_countdown';

// ========== 全局状态 ==========
let isLoggedIn   = false;
let currentUser   = null;
let countdownLeft = 0;
let countdownTimerId = null;
let lockTimerId  = null;
let isLocked     = false;
let timeWhenLocked = 0;

// 音乐状态
let isMusicPlaying = false;
let isSoundEnabled = true;
let currentTrack = 0;
const TRACKS = ['游戏主旋律', '战斗曲', '城镇曲', '旅馆曲'];

// ========== 页面加载完成后 ==========
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initCountdown();
  initLogin();
  initMusic();
  initHeroAnimation();
  initNavDropdown();
  restoreSession();
});

// ========== 导航下拉菜单（消除死亡间隙）==========
function initNavDropdown() {
  const items = document.querySelectorAll('.nav__item');

  items.forEach(item => {
    let showTimer = null;
    let hideTimer = null;
    const sub = item.querySelector('.nav__sub');
    if (!sub) return;

    item.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      showTimer = setTimeout(() => {
        sub.classList.add('show');
      }, 80);
    });

    item.addEventListener('mouseleave', () => {
      clearTimeout(showTimer);
      hideTimer = setTimeout(() => {
        sub.classList.remove('show');
      }, 120);
    });

    sub.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
    });

    sub.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => {
        sub.classList.remove('show');
      }, 120);
    });
  });
}

// ========== 时钟模块 ==========
function initClock() {
  const el = document.getElementById('clockWidget');
  if (!el) return;

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    el.textContent = `${h}:${m}:${s}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ========== 防沉迷倒计时 ==========
function initCountdown() {
  const widget = document.getElementById('countdownWidget');
  if (!widget) return;

  // 恢复之前保存的剩余时间
  const saved = localStorage.getItem(STORAGE_KEY_COUNT);
  if (saved) {
    countdownLeft = parseInt(saved, 10);
  } else {
    countdownLeft = DEFAULT_COUNTDOWN;
  }

  widget.addEventListener('click', () => {
    if (isLoggedIn) openCountdownSettings();
  });

  tickCountdown();
}

function tickCountdown() {
  const widget = document.getElementById('countdownWidget');
  if (!widget) return;

  if (countdownTimerId) clearInterval(countdownTimerId);

  countdownTimerId = setInterval(() => {
    if (!isLoggedIn || isLocked) return;

    countdownLeft--;
    localStorage.setItem(STORAGE_KEY_COUNT, countdownLeft);

    if (countdownLeft <= 0) {
      countdownLeft = 0;
      triggerLock();
      return;
    }

    updateCountdownDisplay();
  }, 1000);
}

function updateCountdownDisplay() {
  const widget = document.getElementById('countdownWidget');
  if (!widget) return;

  const h = Math.floor(countdownLeft / 3600);
  const m = Math.floor((countdownLeft % 3600) / 60);
  const s = countdownLeft % 60;
  widget.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;

  // 不足5分钟变红
  if (countdownLeft < 300) {
    widget.classList.add('warning');
  } else {
    widget.classList.remove('warning');
  }
}

function triggerLock() {
  clearInterval(countdownTimerId);
  isLocked = true;
  timeWhenLocked = DEFAULT_LOCK;

  const overlay = document.getElementById('lockOverlay');
  if (overlay) {
    overlay.classList.add('open');
    updateLockTimerDisplay();
    startLockTimer();
  }

  playSound('lock');
}

function startLockTimer() {
  const lockTimerEl = document.getElementById('lockTimer');
  if (lockTimerId) clearInterval(lockTimerId);

  lockTimerId = setInterval(() => {
    timeWhenLocked--;
    updateLockTimerDisplay();
    if (timeWhenLocked <= 0) {
      clearInterval(lockTimerId);
      unlock();
    }
  }, 1000);
}

function updateLockTimerDisplay() {
  const el = document.getElementById('lockTimer');
  if (!el) return;
  const m = String(Math.floor(timeWhenLocked / 60)).padStart(2, '0');
  const s = String(timeWhenLocked % 60).padStart(2, '0');
  el.textContent = `${m}:${s}`;
}

function unlock() {
  isLocked = false;
  const overlay = document.getElementById('lockOverlay');
  if (overlay) overlay.classList.remove('open');
  countdownLeft = DEFAULT_COUNTDOWN;
  localStorage.setItem(STORAGE_KEY_COUNT, countdownLeft);
  tickCountdown();
}

function openCountdownSettings() {
  const duration = parseInt(prompt(
    `当前防沉迷时长：${Math.floor(DEFAULT_COUNTDOWN/60)}分钟\n\n输入新的倒计时时长（分钟）：`,
    String(Math.floor(DEFAULT_COUNTDOWN / 60))
  ), 10);
  if (!isNaN(duration) && duration > 0) {
    const newSec = duration * 60;
    localStorage.setItem(STORAGE_KEY_COUNT, newSec);
    countdownLeft = newSec;
  }
}

// ========== 登录认证 ==========
function initLogin() {
  const btnLogin  = document.getElementById('btnLogin');
  const btnClose  = document.getElementById('btnCloseLogin');
  const modal     = document.getElementById('loginModal');
  const loginForm = document.getElementById('loginForm');

  if (btnLogin) {
    btnLogin.addEventListener('click', openLoginModal);
  }

  if (btnClose) {
    btnClose.addEventListener('click', closeLoginModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLoginModal();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
}

function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('open');
  // 重置错误信息
  document.getElementById('idError').textContent = '';
  document.getElementById('pwError').textContent = '';
  document.getElementById('inputStudentId').value = '';
  document.getElementById('inputPassword').value = '';
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('open');
}

async function handleLogin(e) {
  e.preventDefault();

  const idInput  = document.getElementById('inputStudentId');
  const pwInput  = document.getElementById('inputPassword');
  const idError  = document.getElementById('idError');
  const pwError  = document.getElementById('pwError');

  const studentId = idInput.value.trim();
  const password  = pwInput.value;

  // 验证学号：10位数字
  idError.textContent = '';
  pwError.textContent = '';

  if (!/^\d{10}$/.test(studentId)) {
    idError.textContent = '学号必须为10位数字';
    return false;
  }

  if (!password) {
    pwError.textContent = '请输入密码';
    return false;
  }

  // SHA-256 加密密码
  const hash = await sha256(password);

  // 简单验证：学号为任意10位数字，密码为 "2026"
  if (password !== '2026') {
    pwError.textContent = '密码错误，初始密码为2026';
    return false;
  }

  // 登录成功
  isLoggedIn = true;
  currentUser = { studentId, hash };

  // 保存到 localStorage
  localStorage.setItem(STORAGE_KEY_LOGGED_IN, 'true');
  localStorage.setItem(STORAGE_KEY_USERNAME, studentId);

  // 更新 UI
  document.getElementById('btnLogin').style.display = 'none';
  const userInfo = document.getElementById('userInfo');
  userInfo.style.display = 'flex';
  document.getElementById('userName').textContent = studentId;

  closeLoginModal();
  playSound('login');

  return false;
}

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256',
    new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0')).join('');
}

function restoreSession() {
  const loggedIn = localStorage.getItem(STORAGE_KEY_LOGGED_IN);
  if (loggedIn === 'true') {
    isLoggedIn = true;
    const username = localStorage.getItem(STORAGE_KEY_USERNAME);
    currentUser = { studentId: username };
    document.getElementById('btnLogin').style.display = 'none';
    const userInfo = document.getElementById('userInfo');
    userInfo.style.display = 'flex';
    document.getElementById('userName').textContent = username || '';
  }
}

// ========== 音乐控制 ==========
function initMusic() {
  const btnPlay = document.getElementById('btnPlayPause');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnSound = document.getElementById('btnSound');
  const volSlider = document.getElementById('volSlider');

  if (btnPlay) {
    btnPlay.addEventListener('click', togglePlayPause);
  }
  if (btnPrev) {
    btnPrev.addEventListener('click', prevTrack);
  }
  if (btnNext) {
    btnNext.addEventListener('click', nextTrack);
  }
  if (btnSound) {
    btnSound.addEventListener('click', toggleSound);
  }
  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      // 音量控制（实际播放需接入音频文件后生效）
    });
  }
}

function togglePlayPause() {
  isMusicPlaying = !isMusicPlaying;
  const btn = document.getElementById('btnPlayPause');
  if (btn) btn.textContent = isMusicPlaying ? '⏸' : '▶';
  playSound('click');
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + TRACKS.length) % TRACKS.length;
  updateTrackDisplay();
  playSound('click');
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % TRACKS.length;
  updateTrackDisplay();
  playSound('click');
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  const btn = document.getElementById('btnSound');
  if (btn) btn.textContent = isSoundEnabled ? '🔊' : '🔇';
}

function updateTrackDisplay() {
  const el = document.getElementById('musicTrack');
  if (el) el.textContent = TRACKS[currentTrack];
}

function playSound(type) {
  if (!isSoundEnabled) return;
  // 音效占位：实际接入音频文件后，使用 Web Audio API 或 HTMLAudioElement 播放
  // 目前仅做交互反馈
  console.log(`[SFX] ${type}`);
}

// ========== 英雄横幅动画（HD-2D 渐变模拟） ==========
function initHeroAnimation() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;

  let tick = 0;
  function animateHero() {
    tick++;
    // 模拟 HD-2D 场景光影流动，保留背景图
    const hue = (tick * 0.5) % 360;
    heroBg.style.backgroundImage = `url('图集/hero_bg.png')`;
    heroBg.style.backgroundSize = 'cover';
    heroBg.style.backgroundPosition = 'center';
    heroBg.style.backgroundRepeat = 'no-repeat';
    heroBg.style.opacity = `${0.85 + Math.sin(tick * 0.02) * 0.15}`;
    requestAnimationFrame(animateHero);
  }
  animateHero();
}

// ========== 角色弹窗 ==========
function openCharModal(charId) {
  const char = CHARACTERS[charId];
  if (!char) return;

  const modal  = document.getElementById('charModal');
  const content = document.getElementById('charModalContent');

  content.innerHTML = `
    <div style="margin-bottom:20px;">
      <div style="font-size:0.7rem;color:#8b949e;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;">${char.job}</div>
      <h2 style="font-size:1.6rem;font-weight:700;color:#e6edf3;letter-spacing:0.1em;">${char.name}</h2>
      <div style="font-size:0.8rem;color:#6e40aa;letter-spacing:0.15em;">${char.en}</div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="font-size:0.75rem;color:#8b949e;margin-bottom:6px;letter-spacing:0.1em;">💎 地图指令</div>
      <div style="background:#0d1117;border-radius:8px;padding:12px;border-left:3px solid #6e40aa;">
        <div style="font-weight:700;color:#c9a227;margin-bottom:4px;">「${char.cmd}」</div>
        <div style="font-size:0.85rem;color:#8b949e;">${char.cmdDesc}</div>
      </div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="font-size:0.75rem;color:#8b949e;margin-bottom:6px;letter-spacing:0.1em;">📖 背景故事</div>
      <p style="font-size:0.9rem;color:#8b949e;line-height:1.7;">${char.bg}</p>
    </div>

    <div style="margin-bottom:16px;">
      <div style="font-size:0.75rem;color:#8b949e;margin-bottom:8px;letter-spacing:0.1em;">⚔️ 战斗技能</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${char.skills.map(s => `<span style="background:rgba(110,64,170,0.2);border:1px solid rgba(110,64,170,0.4);border-radius:20px;padding:4px 10px;font-size:0.75rem;color:#9b6dff;">${s}</span>`).join('')}
      </div>
    </div>

    <div style="display:flex;gap:20px;">
      <div>
        <div style="font-size:0.7rem;color:#484f58;margin-bottom:4px;">武器</div>
        <div style="font-size:0.85rem;color:#e6edf3;">${char.weapon}</div>
      </div>
      <div>
        <div style="font-size:0.7rem;color:#484f58;margin-bottom:4px;">属性</div>
        <div style="font-size:0.85rem;color:#e6edf3;">${char.elem}</div>
      </div>
      <div>
        <div style="font-size:0.7rem;color:#484f58;margin-bottom:4px;">出身地</div>
        <div style="font-size:0.85rem;color:#e6edf3;">${char.hometown}</div>
      </div>
    </div>
  `;

  modal.classList.add('open');
  playSound('click');

  // 关闭按钮
  const btnCloseChar = document.getElementById('btnCloseChar');
  if (btnCloseChar) {
    btnCloseChar.onclick = closeCharModal;
  }
}

function closeCharModal() {
  const modal = document.getElementById('charModal');
  if (modal) modal.classList.remove('open');
}
