class Direction {
    // Create new instances of the same class as static attributes
    static LEFT = new Direction("left")
    static RIGHT = new Direction("right")
    static UP = new Direction("up")
    static DOWN = new Direction("down")

    constructor(name) {
        this.name = name
    }
}