import APIBase from "../baseApi";

export default class RoomAPI extends APIBase {
    constructor() {
        super();
        this.endPoints = {
            insert: "api/v1/room/add-room",
            getAll: "api/v1/room/getAll",
            get: "api/v1/room/getID",
            update: "api/v1/room/edit-room",
            updateStatusRoom: "api/v1/room/edit-room-status",
            delete: "api/v1/room/delete-room"
        };
    }
    updateStatusRoom = (data) => this.httpPut(this.endPoints.updateStatusRoom, data);

}