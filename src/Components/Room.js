class Room {
    constructor(
        id,
        roomNumber,
        categoryId,
        categoryName,
        shortDescription,
        isAvailable,
        bookedBy
    ) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.shortDescription = shortDescription;
        this.isAvailable = isAvailable;
        this.bookedBy = bookedBy;
    }
}

export default Room;
