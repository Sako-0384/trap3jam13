export abstract class State<T> {
    protected get obj(): T {
        return this._obj;
    }
    private _obj: T;
    public abstract onLeave()
    public abstract onEnter()
    public abstract update(delta: number)

    constructor(obj: T) {
        this._obj = obj;
    }
}



