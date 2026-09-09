import { getBookmarksByUser } from '@/lib/api/bookmarks';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const BookMarkPage = async () => {

    const user  = await getUserSession();
    if (!user) return null;

    const bookmarks = await getBookmarksByUser(user.id);
    console.log("Bookmarks:", bookmarks);

    return (
        <div>
            
        </div>
    );
};

export default BookMarkPage;
