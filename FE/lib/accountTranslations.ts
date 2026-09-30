import { normalizeLocale, type LocaleCode } from './locale';
const keys=['title','signup','email','password','confirm','name','working','mismatch','failure','success','logout','profile','welcome'] as const;
const rows:Record<LocaleCode,string[]>={
ko:['계정','회원가입','이메일','비밀번호','비밀번호 확인','이름','처리 중…','비밀번호가 일치하지 않습니다.','요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.','완료되었습니다.','로그아웃','내 계정','안녕하세요'],
en:['Account','Sign up','Email','Password','Confirm password','Name','Please wait…','Passwords do not match.','Unable to complete your request. Please try again.','Done.','Log out','My account','Hello'],
ja:['アカウント','新規登録','メールアドレス','パスワード','パスワード確認','名前','処理中…','パスワードが一致しません。','処理できませんでした。もう一度お試しください。','完了しました。','ログアウト','マイアカウント','こんにちは'],
'zh-Hans':['账户','注册','电子邮箱','密码','确认密码','姓名','处理中…','两次输入的密码不一致。','无法完成请求，请重试。','已完成。','退出登录','我的账户','您好'],
'zh-Hant':['帳戶','註冊','電子郵件','密碼','確認密碼','姓名','處理中…','兩次輸入的密碼不一致。','無法完成請求，請重試。','已完成。','登出','我的帳戶','您好'],
th:['บัญชี','สมัครสมาชิก','อีเมล','รหัสผ่าน','ยืนยันรหัสผ่าน','ชื่อ','กำลังดำเนินการ…','รหัสผ่านไม่ตรงกัน','ไม่สามารถดำเนินการได้ กรุณาลองอีกครั้ง','สำเร็จแล้ว','ออกจากระบบ','บัญชีของฉัน','สวัสดี'],
vi:['Tài khoản','Đăng ký','Email','Mật khẩu','Xác nhận mật khẩu','Tên','Đang xử lý…','Mật khẩu không khớp.','Không thể xử lý yêu cầu. Vui lòng thử lại.','Hoàn tất.','Đăng xuất','Tài khoản của tôi','Xin chào'],
ru:['Аккаунт','Регистрация','Электронная почта','Пароль','Подтвердите пароль','Имя','Подождите…','Пароли не совпадают.','Не удалось выполнить запрос. Попробуйте снова.','Готово.','Выйти','Мой аккаунт','Здравствуйте'],
fr:['Compte','Créer un compte','E-mail','Mot de passe','Confirmer le mot de passe','Nom','Veuillez patienter…','Les mots de passe ne correspondent pas.','Impossible de traiter la demande. Réessayez.','Terminé.','Déconnexion','Mon compte','Bonjour'],
de:['Konto','Registrieren','E-Mail','Passwort','Passwort bestätigen','Name','Bitte warten…','Die Passwörter stimmen nicht überein.','Anfrage fehlgeschlagen. Bitte erneut versuchen.','Fertig.','Abmelden','Mein Konto','Hallo'],
es:['Cuenta','Registrarse','Correo electrónico','Contraseña','Confirmar contraseña','Nombre','Espera…','Las contraseñas no coinciden.','No se pudo completar la solicitud. Inténtalo de nuevo.','Listo.','Cerrar sesión','Mi cuenta','Hola'],
};
export function getAccountCopy(lang:string){return Object.fromEntries(keys.map((key,i)=>[key,rows[normalizeLocale(lang)][i]])) as Record<typeof keys[number],string>;}
