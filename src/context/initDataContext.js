import {
  UserAPI,
  FloorAPI,
  RoomAPI,
  CateloryAPI,
  ClientAPI,
  BillAPI,
  StaffAPI,
  ProductAPI,
  AccountManegeAPI
} from "~/apis";
export default class DataContext {
  constructor() {
    this.api = {
      userApi: new UserAPI(),
      floorApi: new FloorAPI(),
      roomApi: new RoomAPI(),
      cateloryApi: new CateloryAPI(),
      clientApi: new ClientAPI(),
      billApi: new BillAPI(),
      staffApi: new StaffAPI(),
      productApi: new ProductAPI(),
      accountApi: new AccountManegeAPI(),
    };
  }
}
