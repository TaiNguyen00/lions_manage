import { createContext, useState } from "react";
import DataContext from "./initDataContext";
export const AppContext = createContext({});
import { message, notification, Modal } from 'antd';
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const dataInit = new DataContext();

  const spinner = {
    visible() {
      return loading
    },
    show() {
      setLoading(true)
    },
    hidden() {
      setLoading(false)
    }
  }
  const messageContext = {
    /**
     * data message
     * type=['info','success','error','warning']
     * {
     * message:'info'
     * }
  */
    show(data) {
      message[data.type](data.message);
    }
  }
  const notificationContext = {
    /**
 * data message
 * type=['info','success','error','warning']
 * {
 * title:'title'
 * description:'description'
 * duration:'1'  1 giây = 1
 * }
*/

    show(data) {
      notification[data.type]({
        message: data.title,
        description: data.description,
        duration: data.duration || 4,
        onClick: () => { }
      })
    }
  }
  const modal = {
    /**
     * data model
     * type=['info','success','error','warning']
     * {
     * type:'info'
     * title:'this is title for model'
     * contents:['content 1','content2','content3']
     *  onClose :()=>{
     * if you want action when on close model
     * }
     * }
     */
    show(data) {
      Modal[data.type]({
        title: data.title,
        content: data.contents && (
          <div>
            {data.contents.map((content, index) => (
              <p key={index}>{content}</p>
            ))}
          </div>
        ),
        onOk() {
          if (data.onClose) {
            data?.onClose()
          }
        },
      });
    },
  };
  return <AppContext.Provider value={{ ...dataInit, spinner, modal, messageContext, notificationContext }
  }> {children}</AppContext.Provider >;
};
