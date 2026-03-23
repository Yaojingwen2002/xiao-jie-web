// 小杰网页 JavaScript

// 显示设置菜单
function showSettingsMenu(event) {
  event.preventDefault();
  const menu = document.getElementById('settingsMenu');
  menu.classList.add('show');
}

// 关闭设置菜单
function closeSettingsMenu(event) {
  if (event && event.target !== event.currentTarget) return;
  const menu = document.getElementById('settingsMenu');
  menu.classList.remove('show');
}

// 触发头像上传
function triggerAvatarUpload() {
  document.getElementById('avatarInput').click();
  closeSettingsMenu();
}

// 处理头像上传
function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const avatar = document.querySelector('.user-info .avatar');
    avatar.style.backgroundImage = `url(${e.target.result})`;
    avatar.style.backgroundSize = 'cover';
    avatar.style.backgroundPosition = 'center';
    avatar.innerHTML = '';
    
    // 保存到 localStorage
    localStorage.setItem('xiaojie_avatar', e.target.result);
  };
  reader.readAsDataURL(file);
}

// 加载保存的头像
function loadSavedAvatar() {
  const savedAvatar = localStorage.getItem('xiaojie_avatar');
  if (savedAvatar) {
    const avatar = document.querySelector('.user-info .avatar');
    if (avatar) {
      avatar.style.backgroundImage = `url(${savedAvatar})`;
      avatar.style.backgroundSize = 'cover';
      avatar.style.backgroundPosition = 'center';
      avatar.innerHTML = '';
    }
  }
}

// 切换主题
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('xiaojie_theme', newTheme);
  
  // 更新图标
  const themeIcon = document.querySelector('.settings-option i.fa-moon');
  if (themeIcon) {
    themeIcon.className = newTheme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  
  closeSettingsMenu();
}

// 加载主题
function loadTheme() {
  const savedTheme = localStorage.getItem('xiaojie_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
}

// 打开更新日志
function openChangelog() {
  const modal = document.getElementById('changelogModal');
  modal.classList.add('show');
  closeSettingsMenu();
}

// 关闭更新日志
function closeChangelog(event) {
  if (event && event.target !== event.currentTarget) return;
  const modal = document.getElementById('changelogModal');
  modal.classList.remove('show');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  loadSavedAvatar();
  
  // 点击其他地方关闭菜单
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('settingsMenu');
    const userInfo = document.querySelector('.user-info');
    if (menu && !menu.contains(event.target) && !userInfo.contains(event.target)) {
      menu.classList.remove('show');
    }
  });
  
  // ESC 关闭弹窗
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeSettingsMenu();
      closeChangelog();
    }
  });
});