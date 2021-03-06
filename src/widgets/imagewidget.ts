import { Widget } from "./widget";
import { WidgetRender } from "../common/widgetrender";
import { Dockerode } from "../common/docker/dockerode";
import { Log } from "../common/log";
import { injectable } from "inversify";

@injectable()
export class ImageWidget extends Widget {
    private imageTable: any;

    getCommandName(): string {
        return "Images";
    }

    getCommandKey(): { [key: string]: any } {
        return {
            keys: ["i"],
            callback: () => {
                if (!this.imageTable) {
                    this.render();
                }
                this.active();
            }
        };
    }

    public getAllElements(): Array<any> {
        return [this.imageTable];
    }

    protected async renderWidget(box: any) {
        try {
            this.imageTable = WidgetRender.table(box, 0, 0, "100%-2", "100%-2", "Images");
            const data = await Dockerode.singleton.listImages();
            this.imageTable.setData(data);
        } catch (error) {
            Log.error(error);
        }
    }
}