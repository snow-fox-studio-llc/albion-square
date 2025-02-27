package studio.snowfox.albionsquare.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import studio.snowfox.albionsquare.entity.AlbionOnlineItem;

public interface AlbionOnlineItemRepository extends JpaRepository<AlbionOnlineItem, Long> {
    void deleteAllByShaNot(String shaNot);

    List<AlbionOnlineItem> findAllByAssetIsNullOrAssetIsFalse();
}
