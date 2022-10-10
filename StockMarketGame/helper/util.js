export function lerp(b,c,d) {
    return (1-d)*b+d*c;
}

// Test For Hit
// A basic AABB check between two different bodies
export function testCollision(a, b) {
    try {
        var ab = a.getBounds();
        var bb = b.getBounds();
        return ab.x + (ab.width - ab.width) > bb.x && 
        ab.x < bb.x + (bb.width - bb.width) && 
        ab.y + (ab.height - bb.height) > bb.y && 
        ab.y < bb.y + (bb.height - ab.height) ;
    } catch (err) {
        
    }
}