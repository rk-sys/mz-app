import ElNotification from 'element-ui/lib/notification.js';
import 'element-ui/lib/theme-chalk/notification.css';
import '@/styles/element-ui/_notification.scss';

export default class Notification {
  public static successNotification(title: string, message: string) {
    ElNotification.success({
      title,
      message,
      type: 'success',
      customClass: 'el-notification--success',
    });
  }

  public static errorNotification(title: string, message: string) {
    ElNotification.error({
      title,
      message,
      type: 'error',
      customClass: 'el-notification--error',
    });
  }
}
