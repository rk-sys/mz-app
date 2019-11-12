import ElNotification from 'element-ui/lib/notification.js';
import 'element-ui/lib/theme-chalk/notification.css';
import '@/assets/styles/element-ui/_notification.scss';

export default class Notification {
  public static successNotification(title: string, message: string) {
    ElNotification.success({
      title,
      message,
      type: 'success',
      customClass: 'el-notification--success',
      duration: 2000,
      showClose: true,
    });
  }

  public static errorNotification(title: string, message: string) {
    ElNotification.error({
      title,
      message,
      type: 'error',
      customClass: 'el-notification--error',
      duration: 2000,
      showClose: true,
    });
  }
}
