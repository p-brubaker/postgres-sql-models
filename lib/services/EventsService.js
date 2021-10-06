import fetchEventDataObj from '../utils/fetchEventDataObject';
import RecEvent from '../models/RecEvent.js';

export default class EventService {
    static async saveEvent(recAreaId) {
        const eventData = await fetchEventDataObj(recAreaId);
        const event = {
            entityId: eventData.EntityID,
            eventName: eventData.EventName,
            description: eventData.Description,
        };

        const result = await RecEvent.insert(event);
        return result;
    }

    static async getAll() {
        const result = RecEvent.getAll();
        return result;
    }

    static async getById(id) {
        const result = RecEvent.getById(id);
        return result;
    }

    static async updateById(obj) {
        const result = RecEvent.updateById(obj);
        return result;
    }
}
